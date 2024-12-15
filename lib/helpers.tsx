import {
  CIcon,
  CSharpIcon,
  CssIcon,
  HtmlIcon,
  JavaIcon,
  JavaScriptIcon,
  PHPIcon,
  PythonIcon,
  ReactIcon,
  TypeScriptIcon,
} from "@/components/ui/icons";
import { CpuIcon } from "lucide-react";

function getLanguageIcon(language: string): React.ReactNode {
  switch (language) {
    case "jsx":
      return <ReactIcon size={20} />;
    case "typescript":
      return <TypeScriptIcon size={20} />;
    case "javascript":
      return <JavaScriptIcon size={20} />;
    case "php":
      return <PHPIcon size={28} />;
    case "c":
      return <CIcon size={20} />;
    case "java":
      return <JavaIcon size={20} />;
    case "python":
      return <PythonIcon size={20} />;
    case "cpp":
      return <CpuIcon />;
    case "csharp":
      return <CSharpIcon size={20} />;
    case "css":
      return <CssIcon size={20} />;
    case "html":
      return <HtmlIcon size={20} />;

    default:
      return <span className="sm:text-xs lowercase">{language}</span>;
  }
}

export { getLanguageIcon };
