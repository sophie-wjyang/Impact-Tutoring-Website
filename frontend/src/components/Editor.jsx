import React from "react";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Button } from "react-bootstrap";
import "../App.css";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";
import { faStrikethrough } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    } else {
        console.log("NOT NULL");
    }

    return (
        <div className="editor-menu-bar">
            <div>
                {/* bold */}
                <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "is-active" : ""}>
                    <FontAwesomeIcon icon={faBold} />
                </button>

                {/* italic */}
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is-active" : ""}
                >
                    <FontAwesomeIcon icon={faItalic} />
                </button>

                {/* underline */}
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleUnderline().run()}
                    className={editor.isActive("underline") ? "is-active" : ""}
                >
                    <FontAwesomeIcon icon={faUnderline} />
                </button>

                {/* strikethrough */}
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "is-active" : ""}
                >
                    <FontAwesomeIcon icon={faStrikethrough} />
                </button>

                {/* headings */}
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}>
                    H1
                </button>

                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>
                    H2
                </button>

                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}>
                    H3
                </button>

                {/* text */}
                <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive("paragraph") ? "is-active" : ""}>
                    text
                </button>

                {/* bullet list */}
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""}>
                    <FontAwesomeIcon icon={faListUl} />
                </button>

                {/* ordered list */}
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is-active" : ""}>
                    <FontAwesomeIcon icon={faListOl} />
                </button>
            </div>

            <div>
                {/* undo */}
                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                    <FontAwesomeIcon icon={faUndo} />
                </button>

                {/* redo */}
                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
                    <FontAwesomeIcon icon={faRedo} />
                </button>
            </div>
        </div>
    );
};

const extensions = [
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
    Underline,
];

const content = ``;

export default function Editor() {
    // const { editor } = useCurrentEditor();

    // if (!editor) {
    //     console.log("NULL")
    //     return null;
    // }

    function saveEditorContent() {
        // console.log(editor.getHTML());
    }

    return (
        <>
            {/* title */}
            <h1 className="editor-heading">Lesson plan</h1>
            <div className="editor-details">
                <p className="editor-date">
                    <b>Date:</b> January 23, 2024
                </p>
                <p className="editor-tutee">
                    <b>Tutee:</b> Gloria Li
                </p>
            </div>

            {/* editor */}
            <div className="editor">
                <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
            </div>

            {/* save button */}
            <Button className="editor-save-button" onClick={saveEditorContent}>
                Save
            </Button>
        </>
    );
}
