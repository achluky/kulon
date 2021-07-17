import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false
});

export default function editor ({deskripsi}) {
  return (
    <MdEditor
      style={{ height: "200px" }}
      value={deskripsi}
      renderHTML={(text) => <ReactMarkdown source={text} />}
    />
  );
}
