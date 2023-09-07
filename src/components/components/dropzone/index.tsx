import { FileUploader } from "react-drag-drop-files";

const DropZone = ({fileTypes, multiple, handleChange, children}) => {
  return (
    <FileUploader 
      handleChange={handleChange}
      multiple={multiple}
      name="file" 
      types={fileTypes} 
      hoverTitle="Drop Here!"
      children={children}
    />
  );
}
export default DropZone;