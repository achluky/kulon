import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(
    async () => {
        const ace = await require("react-ace");
        require("ace-builds/src-noconflict/mode-javascript");
        require("ace-builds/src-noconflict/theme-github");
        require("ace-builds/src-noconflict/theme-monokai");
        return ace;
    },
    {
        loading: () => (
            <p>Loading</p>
        ),
        ssr: false,
    },
);

export default function CodeEditor(props) {
    return (
        <Editor
            {...props}
        />
    );
}