import { useRef, useState } from "react";
import QuillEditor from "react-quill";

import "react-quill/dist/quill.snow.css";
import styles from './Editor.module.css';

const Editor = () => {
	const [value, setValue] = useState("");
	const quill = useRef();

	function saveSummary() {
		console.log(value);
	}

	const modules = {
		toolbar: {
			container: [
				[{ header: [2, 3, 4, false] }],
				["bold", "italic", "underline", "blockquote"],
				[{ color: [] }],
				[
					{ list: "ordered" },
					{ list: "bullet" },
					{ indent: "-1" },
					{ indent: "+1" },
				],
				["link", "image"],
				["clean"],
			]
		},
		clipboard: {
			matchVisual: true,
		}
	}

	const formats = [
		"header", "bold",  "italic",
		"underline", "strike", "blockquote",
		"list", "bullet", "indent",
		"link", "image", "color", "clean",
	];

	return (
		<div className={styles.wrapper}>
			<QuillEditor
				ref={(el) => (quill.current = el)}
				id={styles.editor}
				theme="snow"
				value={value}
				formats={formats}
				modules={modules}
				onChange={(value) => setValue(value)}
			/>
			<button onClick={saveSummary} className={styles.btn}>
				Submit
			</button>
		</div>
	);
};

export default Editor;