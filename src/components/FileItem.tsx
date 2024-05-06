import { useState } from "react";
import { File } from "../data";

const FileItem=({ item, onCopy, onDelete, onRename, onSelect }: { item: File, onCopy: () => void, onDelete: () => void, onRename: (item: File, newName: string) => void, onSelect: (item: File) => void; }) => {
    const [collapsed, setCollapsed]=useState(true);
    const [selected, setSelected]=useState(false);
    const [contextMenuPosition, setContextMenuPosition]=useState<{ top: number, left: number; }|null>(null);
    const [newName, setNewName]=useState("dummy_nameName" + item.name);

    const toggleCollapse=() => {
        setCollapsed(!collapsed);
    };

    const handleContextMenu=(e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent parent items from collapsing when right-clicked
        setSelected(true);
        setContextMenuPosition({ top: e.clientY, left: e.clientX });
    };

    const handleClick=() => {
        setSelected(true);
        onSelect(item);
    };

    const handleCopy=() => {
        onCopy();
        setSelected(false);
    };

    const handleDelete=() => {
        onDelete();
        setSelected(false);
    };

    const handleRename=() => {
        setNewName(item.name); // Reset newName input
        onRename(item, newName);
        setSelected(false);
    };

    const handleNameChange=(e: React.ChangeEvent<HTMLInputElement>) => {

        setNewName(e.target.value);
    };

    return (
        <div>
            <div onClick={ toggleCollapse } onContextMenu={ handleContextMenu } onClickCapture={ () => setSelected(false) } style={ { cursor: 'pointer', backgroundColor: selected? 'lightblue':'inherit' } }>
                { item.type==='folder'? (
                    <span>{ collapsed? '▶️':'📁' }</span>
                ):(
                    <span style={ { marginLeft: '15px' } }>📄</span>
                ) }
                <span onClick={ handleClick }>{ item.name }</span>
            </div>
            { !collapsed&&item.data&&(
                <div style={ { marginLeft: '20px' } }>
                    { item.data.map((child) => (
                        <FileItem key={ child.name } item={ child } onCopy={ onCopy } onDelete={ onDelete } onRename={ onRename } onSelect={ onSelect } />
                    )) }
                </div>
            ) }
            { selected&&contextMenuPosition&&(
                <div style={ { position: 'fixed', top: contextMenuPosition.top, left: contextMenuPosition.left, backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' } }>
                    <div onClick={ handleCopy }>Copy</div>
                    <div onClick={ handleDelete }>Delete</div>
                    <div onClick={ handleRename }>Rename</div>
                </div>
            ) }
        </div>
    );
};

export default FileItem;
