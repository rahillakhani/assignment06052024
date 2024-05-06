import {useState} from "react";
import {File} from "../data";
import FileSystemItem from "./FileItem";

const FileSystem = ({fileData}: { fileData: File; }) => {
				const [fileSystemData, setFileSystemData] = useState<File>(fileData);
				const [selectedItem, setSelectedItem] = useState<File | null>(null);

				const handleCopy = () => {
								console.log("Copying", selectedItem?.name);
				};

				const handleDelete = () => {
								console.log("Deleting", selectedItem?.name);
								// Implement delete logic here
				};

				const handleRename = (item: File, newName: string) => {
								console.log("Renaming", item.name, "to", newName);
								const updatedData = renameItem(fileSystemData, item, newName);
								setFileSystemData(updatedData);
				};

				const handleSelect = (item: File) => {
								setSelectedItem(item);
				};

				// Function to recursively rename an item in the file system data
				const renameItem = (parent: File, item: File, newName: string): File => {
								if (parent === item) {
												return {...parent, name: newName};
								}

								if (parent.data) {
												const newData = parent.data.map(child => {
																if (child === item) {
																				return {...child, name: newName};
																} else if (child.type === 'folder') {
																				return renameItem(child, item, newName);
																}
																return child;
												});

												return {...parent, data: newData};
								}

								return parent;
				};

				return (
								<div>
												<FileSystemItem item={fileSystemData} onCopy={handleCopy} onDelete={handleDelete}
												                onRename={handleRename} onSelect={handleSelect}/>
								</div>
				);
};

export default FileSystem;
