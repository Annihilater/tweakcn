import { ThemeEditorPreviewProps } from '@/types/theme';
import { Mail, Check, Settings, Plus, ArrowRight, Info, AlertTriangle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '../../lib/utils';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ScrollArea } from '../ui/scroll-area';

const ThemePreviewPanel = ({ styles, currentMode }: ThemeEditorPreviewProps) => {
  if (!styles || !styles[currentMode]) {
    return null;
  }

  const renderColorPreview = (label: string, color: string) => (
    <div className="flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-md"
        style={{ backgroundColor: color }}
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{color}</p>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Theme Preview</h2>
      </div>

      <ScrollArea className="flex-1 rounded-lg border">
        <Tabs defaultValue="components" className="w-full h-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="colors">Color Palette</TabsTrigger>
          </TabsList>

          <div className={cn(
            {
              "preview-theme": currentMode === 'light',
              "preview-theme-dark": currentMode === 'dark',
            }
          )}>
            <TabsContent value="components" className="p-4 space-y-6 mt-0">
              {/* Button showcase */}
              <section className="space-y-4">
                <h3 className="text-sm font-medium">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button size="sm">Small</Button>
                  <Button size="lg">Large</Button>
                </div>
              </section>

              {/* Card showcase */}
              <section className="space-y-4">
                <h3 className="text-sm font-medium">Card</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description goes here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">This is the main content of the card.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost">Cancel</Button>
                    <Button>Submit</Button>
                  </CardFooter>
                </Card>
              </section>

              {/* Badge & Alert showcase */}
              <section className="space-y-4">
                <h3 className="text-sm font-medium">Badges & Alerts</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert for your attention.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was an error processing your request.
                  </AlertDescription>
                </Alert>
              </section>

              {/* Interactive components */}
              <section className="space-y-4">
                <h3 className="text-sm font-medium">Interactive Elements</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <Switch id="airplane-mode" />
                  <label htmlFor="airplane-mode">Airplane Mode</label>
                </div>
              </section>

              {/* Table showcase */}
              <section className="space-y-4">
                <h3 className="text-sm font-medium">Table</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Alex Johnson</TableCell>
                      <TableCell><Badge variant="outline">Active</Badge></TableCell>
                      <TableCell>Developer</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm"><Settings className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sarah Chen</TableCell>
                      <TableCell><Badge variant="outline" className="bg-destructive/10 text-destructive">Inactive</Badge></TableCell>
                      <TableCell>Designer</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm"><Settings className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </section>
            </TabsContent>
          </div>

          <TabsContent value="colors" className="p-4 space-y-4">
            <div className="grid grid-cols-1 gap-8">
              {/* Primary Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium border-b pb-2">Primary Colors</h3>
                <div className="space-y-4">
                  {renderColorPreview('Background', styles[currentMode].background)}
                  {renderColorPreview('Foreground', styles[currentMode].foreground)}
                  {renderColorPreview('Primary', styles[currentMode].primary)}
                  {renderColorPreview('Primary Foreground', styles[currentMode]['primary-foreground'])}
                </div>
              </div>

              {/* Secondary & Accent Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium border-b pb-2">Secondary & Accent Colors</h3>
                <div className="space-y-4">
                  {renderColorPreview('Secondary', styles[currentMode].secondary)}
                  {renderColorPreview('Secondary Foreground', styles[currentMode]['secondary-foreground'])}
                  {renderColorPreview('Accent', styles[currentMode].accent)}
                  {renderColorPreview('Accent Foreground', styles[currentMode]['accent-foreground'])}
                </div>
              </div>

              {/* Component Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium border-b pb-2">Component Colors</h3>
                <div className="space-y-4">
                  {renderColorPreview('Card Background', styles[currentMode].card)}
                  {renderColorPreview('Card Foreground', styles[currentMode]['card-foreground'])}
                  {renderColorPreview('Popover Background', styles[currentMode].popover)}
                  {renderColorPreview('Popover Foreground', styles[currentMode]['popover-foreground'])}
                </div>
              </div>

              {/* Utility Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium border-b pb-2">Utility Colors</h3>
                <div className="space-y-4">
                  {renderColorPreview('Muted', styles[currentMode].muted)}
                  {renderColorPreview('Muted Foreground', styles[currentMode]['muted-foreground'])}
                  {renderColorPreview('Border', styles[currentMode].border)}
                  {renderColorPreview('Input', styles[currentMode].input)}
                  {renderColorPreview('Ring', styles[currentMode].ring)}
                </div>
              </div>

              {/* Status Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium border-b pb-2">Status Colors</h3>
                <div className="space-y-4">
                  {renderColorPreview('Destructive', styles[currentMode].destructive)}
                  {renderColorPreview('Destructive Foreground', styles[currentMode]['destructive-foreground'])}
                </div>
              </div>

              {/* Chart Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium border-b pb-2">Chart Colors</h3>
                <div className="space-y-4">
                  {renderColorPreview('Chart 1', styles[currentMode]['chart-1'])}
                  {renderColorPreview('Chart 2', styles[currentMode]['chart-2'])}
                  {renderColorPreview('Chart 3', styles[currentMode]['chart-3'])}
                  {renderColorPreview('Chart 4', styles[currentMode]['chart-4'])}
                  {renderColorPreview('Chart 5', styles[currentMode]['chart-5'])}
                </div>
              </div>

              {/* Sidebar Colors */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium border-b pb-2">Sidebar Colors</h3>
                <div className="space-y-4">
                  {renderColorPreview('Sidebar Background', styles[currentMode].sidebar)}
                  {renderColorPreview('Sidebar Foreground', styles[currentMode]['sidebar-foreground'])}
                  {renderColorPreview('Sidebar Primary', styles[currentMode]['sidebar-primary'])}
                  {renderColorPreview('Sidebar Primary Foreground', styles[currentMode]['sidebar-primary-foreground'])}
                  {renderColorPreview('Sidebar Accent', styles[currentMode]['sidebar-accent'])}
                  {renderColorPreview('Sidebar Accent Foreground', styles[currentMode]['sidebar-accent-foreground'])}
                  {renderColorPreview('Sidebar Border', styles[currentMode]['sidebar-border'])}
                  {renderColorPreview('Sidebar Ring', styles[currentMode]['sidebar-ring'])}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default ThemePreviewPanel;
