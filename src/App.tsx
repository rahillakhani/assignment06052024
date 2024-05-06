import FileSystem from './components/FileSystem'; // Import the File interface
import { fileData } from './data'; // Import the File interface

const App=() => {
    return <FileSystem fileData={ fileData } />;
};
export default App;
