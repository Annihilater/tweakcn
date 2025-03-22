import React from "react";
import { ControlPanelProps } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ControlSection from "./control-section";
import ColorPicker from "./color-picker";
import ResetButton from "./reset-button";
import { Link } from "react-router-dom";
import { ExternalLink, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editor-store";
import { ScrollArea } from "../ui/scroll-area";
import { SliderWithInput } from "./slider-with-input";

// Readonly color display component for theme-controlled properties
const ReadOnlyColorDisplay = ({
  color,
  label,
  linkTo,
}: {
  color: string;
  label: string;
  linkTo: string;
}) => {
  // Map labels to theme section IDs
  const getSectionId = (label: string) => {
    switch (label.toLowerCase()) {
      case "background color":
      case "text color":
      case "hover background":
        return "#primary-colors";
      default:
        return "";
    }
  };

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <Label
          htmlFor={`color-${label.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-xs font-medium"
        >
          {label}
        </Label>
        <div className="text-xs text-muted-foreground">{color}</div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 rounded border overflow-hidden relative flex items-center justify-center"
          style={{
            backgroundColor: color,
            cursor: "default",
            opacity: 0.8,
          }}
        />

        <div className="flex-1 relative">
          <input
            type="text"
            value={color}
            readOnly
            className="w-full h-8 px-2 text-sm rounded-md border bg-muted/50 text-muted-foreground cursor-not-allowed"
          />
          <Button
            variant="outline"
            size="sm"
            asChild
            className="absolute right-1 top-1 h-6 px-2 text-xs"
          >
            <Link
              to={`${linkTo}${getSectionId(label)}`}
              className="flex items-center gap-1"
              title="Edit in Theme Editor"
            >
              <Palette size={12} />
              <span>Theme</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const ControlPanel = ({
  styles,
  onChange,
  onReset,
  hasChanges = false,
}: ControlPanelProps) => {
  const updateStyle = React.useCallback(
    <K extends keyof typeof styles>(key: K, value: (typeof styles)[K]) => {
      onChange({ ...styles, [key]: value });
    },
    [onChange, styles]
  );

  const themeState = useEditorStore((state) => state.themeState);
  const mode = themeState?.currentMode;
  const themeStyles = themeState?.styles[mode];

  return (
    <div className="h-full pb-4">
      <div className="sticky top-0 z-10 pb-2 mb-2 bg-background">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Button Editor</h2>
          {hasChanges && (
            <ResetButton onReset={onReset} label="Reset button styles" />
          )}
        </div>
      </div>

      <ScrollArea className="h-full">
        <div className="mt-4 mb-3">
          <Label htmlFor="button-variant" className="text-xs mb-1.5 block">
            Button Variant
          </Label>
          <Select
            value="default"
            onValueChange={(value) => {
              // For now, we only support default variant
              if (value === "default") {
                updateStyle("variant", value);
              }
            }}
          >
            <SelectTrigger id="button-variant" className="h-9">
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="secondary" disabled>
                Secondary (Coming Soon)
              </SelectItem>
              <SelectItem value="destructive" disabled>
                Destructive (Coming Soon)
              </SelectItem>
              <SelectItem value="outline" disabled>
                Outline (Coming Soon)
              </SelectItem>
              <SelectItem value="ghost" disabled>
                Ghost (Coming Soon)
              </SelectItem>
              <SelectItem value="link" disabled>
                Link (Coming Soon)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-3 mb-4 w-full">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="states">States</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="mt-0 animate-in">
            <ControlSection title="Colors" expanded>
              {/* Theme-controlled colors (read-only) */}
              <ReadOnlyColorDisplay
                color={themeStyles?.primary}
                label="Background Color"
                linkTo="/editor/theme"
              />
              <ReadOnlyColorDisplay
                color={themeStyles?.["primary-foreground"]}
                label="Text Color"
                linkTo="/editor/theme"
              />
              <ColorPicker
                color={styles.borderColor}
                onChange={(color) => updateStyle("borderColor", color)}
                label="Border Color"
              />
            </ControlSection>

            <ControlSection title="Dimensions">
              <SliderWithInput
                value={styles.paddingX}
                onChange={(value) => updateStyle("paddingX", value)}
                min={0}
                max={40}
                label="Padding X"
              />
              <SliderWithInput
                value={styles.paddingY}
                onChange={(value) => updateStyle("paddingY", value)}
                min={0}
                max={40}
                label="Padding Y"
              />
              <SliderWithInput
                value={styles.borderWidth}
                onChange={(value) => updateStyle("borderWidth", value)}
                min={0}
                max={8}
                label="Border Width"
              />
              <SliderWithInput
                value={styles.borderRadius}
                onChange={(value) => updateStyle("borderRadius", value)}
                min={0}
                max={30}
                label="Border Radius"
              />
            </ControlSection>

            <ControlSection title="Shadow">
              <SliderWithInput
                value={styles.shadowOpacity}
                onChange={(value) => updateStyle("shadowOpacity", value)}
                min={0}
                max={1}
                step={0.01}
                label="Shadow Opacity"
                unit=""
              />
              {styles.shadowOpacity > 0 && (
                <>
                  <ColorPicker
                    color={styles.shadowColor}
                    onChange={(color) => updateStyle("shadowColor", color)}
                    label="Shadow Color"
                  />
                  <SliderWithInput
                    value={styles.shadowOffsetX}
                    onChange={(value) => updateStyle("shadowOffsetX", value)}
                    min={-20}
                    max={20}
                    label="Shadow X Offset"
                  />
                  <SliderWithInput
                    value={styles.shadowOffsetY}
                    onChange={(value) => updateStyle("shadowOffsetY", value)}
                    min={-20}
                    max={20}
                    label="Shadow Y Offset"
                  />
                  <SliderWithInput
                    value={styles.shadowBlur}
                    onChange={(value) => updateStyle("shadowBlur", value)}
                    min={0}
                    max={40}
                    label="Shadow Blur"
                  />
                  <SliderWithInput
                    value={styles.shadowSpread}
                    onChange={(value) => updateStyle("shadowSpread", value)}
                    min={0}
                    max={40}
                    label="Shadow Spread"
                  />
                </>
              )}
            </ControlSection>

            <ControlSection title="Animation">
              <SliderWithInput
                value={styles.transitionDuration}
                onChange={(value) => updateStyle("transitionDuration", value)}
                min={0}
                max={1000}
                step={10}
                label="Transition Duration"
                unit="ms"
              />
              <div className="mb-3">
                <Label htmlFor="transition-easing" className="text-xs mb-1.5 block">
                  Transition Easing
                </Label>
                <Select
                  value={styles.transitionEasing}
                  onValueChange={(value) => updateStyle("transitionEasing", value)}
                >
                  <SelectTrigger id="transition-easing" className="h-9">
                    <SelectValue placeholder="Select easing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ease">Ease</SelectItem>
                    <SelectItem value="ease-in">Ease In</SelectItem>
                    <SelectItem value="ease-out">Ease Out</SelectItem>
                    <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                    <SelectItem value="linear">Linear</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </ControlSection>
          </TabsContent>

          <TabsContent value="states" className="mt-0 animate-in">
            <ControlSection title="Hover State" expanded>
              {/* Theme-controlled hover background (read-only) */}
              <ReadOnlyColorDisplay
                color={themeStyles.primary}
                label="Hover Background"
                linkTo="/editor/theme"
              />
              <SliderWithInput
                value={styles.hoverBackgroundOpacity ?? 90}
                onChange={(value) => updateStyle("hoverBackgroundOpacity", value)}
                min={0}
                max={100}
                step={5}
                label="Hover Background Opacity"
                unit="%"
              />
              <ReadOnlyColorDisplay
                color={themeStyles?.["primary-foreground"]}
                label="Hover Text"
                linkTo="/editor/theme"
              />
              <ColorPicker
                color={styles.hoverBorderColor}
                onChange={(color) => updateStyle("hoverBorderColor", color)}
                label="Hover Border"
              />
            </ControlSection>

            <ControlSection title="Focus State">
              <ColorPicker
                color={styles.focusBorderColor}
                onChange={(color) => updateStyle("focusBorderColor", color)}
                label="Focus Border"
              />
              <ColorPicker
                color={styles.focusRingColor}
                onChange={(color) => updateStyle("focusRingColor", color)}
                label="Focus Ring"
              />
              <SliderWithInput
                value={styles.focusRingWidth}
                onChange={(value) => updateStyle("focusRingWidth", value)}
                min={0}
                max={5}
                step={0.5}
                label="Focus Ring Width"
              />
            </ControlSection>

            <ControlSection title="Active State">
              <ColorPicker
                color={styles.activeBackgroundColor}
                onChange={(color) => updateStyle("activeBackgroundColor", color)}
                label="Active Background"
              />
              <ColorPicker
                color={styles.activeTextColor}
                onChange={(color) => updateStyle("activeTextColor", color)}
                label="Active Text"
              />
              <ColorPicker
                color={styles.activeBorderColor}
                onChange={(color) => updateStyle("activeBorderColor", color)}
                label="Active Border"
              />
            </ControlSection>
          </TabsContent>

          <TabsContent value="typography" className="mt-0 animate-in">
            <ControlSection title="Text Properties" expanded>
              <SliderWithInput
                value={styles.fontSize}
                onChange={(value) => updateStyle("fontSize", value)}
                min={8}
                max={24}
                label="Font Size"
              />

              <div className="mb-3">
                <Label htmlFor="font-weight" className="text-xs mb-1.5 block">
                  Font Weight
                </Label>
                <Select
                  value={styles.fontWeight}
                  onValueChange={(value) => updateStyle("fontWeight", value)}
                >
                  <SelectTrigger id="font-weight" className="h-9">
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300">Light (300)</SelectItem>
                    <SelectItem value="400">Regular (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semibold (600)</SelectItem>
                    <SelectItem value="700">Bold (700)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-3">
                <Label htmlFor="text-transform" className="text-xs mb-1.5 block">
                  Text Transform
                </Label>
                <Select
                  value={styles.textTransform}
                  onValueChange={(value) => updateStyle("textTransform", value)}
                >
                  <SelectTrigger id="text-transform" className="h-9">
                    <SelectValue placeholder="Select transform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="uppercase">Uppercase</SelectItem>
                    <SelectItem value="lowercase">Lowercase</SelectItem>
                    <SelectItem value="capitalize">Capitalize</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <SliderWithInput
                value={styles.letterSpacing}
                onChange={(value) => updateStyle("letterSpacing", value)}
                min={-0.1}
                max={0.5}
                step={0.01}
                label="Letter Spacing"
                unit="em"
              />

              <SliderWithInput
                value={styles.lineHeight}
                onChange={(value) => updateStyle("lineHeight", value)}
                min={0.7}
                max={2}
                step={0.1}
                label="Line Height"
                unit="x"
              />
            </ControlSection>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default ControlPanel;
