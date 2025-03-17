import { getEditorConfig } from "@/config/editors";
import Editor from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import EditorCombobox from "../components/editor/EditorCombobox";
import { Heart, Moon, Sun } from "lucide-react";
import GitHubIcon from "@/assets/github.svg?react";
import { cn } from "../lib/utils";
import { useTheme } from "../components/theme-provider";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const Index = () => {
  const { editorType = "button" } = useParams();
  const editorConfig = getEditorConfig(editorType);
  const { theme, toggleTheme } = useTheme();

  const [stargazersCount, setStargazersCount] = useState(0);

  useEffect(() => {
    const owner = "jnsahaj";
    const repo = "tweakcn";

    const fetchData = async () => {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      const data = await response.json();
      setStargazersCount(data.stargazers_count);
    };

    fetchData();
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col text-foreground bg-background transition-colors",
      )}
    >
      <header className="border-b">
        <div className="px-2 md:px-4 py-4 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-1">
            <img src={logo} alt="tweakcn" className="h-8 w-8 mr-1 md:mr-2" title="Nothing here yet..." />
            <EditorCombobox />
            <Button variant="secondary" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Link
              to="https://github.com/sponsors/jnsahaj"
              target="_blank"
            >
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" stroke="#c96198" fill="#c96198" />
              </Button>
            </Link>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/jnsahaj/tweakcn"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                <GitHubIcon className="h-5 w-5" />
                {stargazersCount > 0 && stargazersCount}
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <Editor config={editorConfig} />
      </main>
    </div>
  );
};

export default Index;
