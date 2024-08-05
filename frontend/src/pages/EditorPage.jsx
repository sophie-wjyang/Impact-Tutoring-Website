import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

// styling
import "../App.css";
import { Button } from "react-bootstrap";

// tiptap
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

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
import client from "../axios";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="editor-menu-bar">
      <div>
        {/* bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
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
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>

        {/* text */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          text
        </button>

        {/* bullet list */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>

        {/* ordered list */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
      </div>

      <div>
        {/* undo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FontAwesomeIcon icon={faUndo} />
        </button>

        {/* redo */}
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  // @ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline,
];

export default function Editor(props) {
  const { title } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    sessionID,
    month,
    day,
    year,
    tutorFirstName = "",
    tutorLastName = "",
    tuteeFirstName = "",
    tuteeLastName = "",
  } = location.state || {};
  const { user } = useUser();

  // retrieve saved content from database
  const [content, setContent] = useState("");
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    const data = {
      sessionID: sessionID,
      type: title,
    };

    client
      .get("get-editor-content", {
        params: data,
      })
      .then((res) => {
        setContent(res.data[0][0]);
        setIsContentLoaded(true);
      });
  }, []);

  // initialize editor
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // update the editor with the saved content
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [isContentLoaded]);

  // save new content to database
  function saveEditorContent() {
    const data = {
      sessionID: sessionID,
      type: title,
      content: content,
    };

    client.post("save-editor-content", data);
  }

  function handleBackClick() {
    navigate(-1);
  }

  return (
    <>
      {/* title */}
      <h1 className="editor-heading">{title}</h1>
      <div className="editor-details">
        <p className="editor-date">
          <b>Date:</b> {month} {day}, {year}
        </p>
        {user?.type === "tutor" && (
          <p className="editor-person">
            <b>Tutee:</b> {tuteeFirstName} {tuteeLastName}
          </p>
        )}
        {user?.type === "tutee" && (
          <p className="editor-person">
            <b>Tutor:</b> {tutorFirstName} {tutorLastName}
          </p>
        )}
        {user?.type === "admin" && (
          <div>
            <p className="editor-person">
              <b>Tutor:</b> {tutorFirstName} {tutorLastName}
            </p>
            <p className="editor-person">
              <b>Tutee:</b> {tuteeFirstName} {tuteeLastName}
            </p>
          </div>
        )}
      </div>

      {/* editor */}
      <div className="editor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      {/* save button */}
      <Button className="editor-save-button" onClick={saveEditorContent}>
        Save
      </Button>

      {/* back button */}
      <Button className="editor-back-button" onClick={handleBackClick}>
        Back
      </Button>
    </>
  );
}
