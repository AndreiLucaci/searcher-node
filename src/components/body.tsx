import { Box, List } from "@mui/material";
import { useEffect, useState } from "react";
import { distinctUntilChanged } from "rxjs";
import { Store } from "../stores";
import { ExtendedDirent } from "../utils/types";
import { FileListItem } from "./listItem";

export const Body = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [showAllFiles, setShowAllFiles] = useState(true);
  const [files, setFiles] = useState<ExtendedDirent[]>([]);
  // const [filteredFiles, setFilteredFiles] = useState<ExtendedDirent[]>([]);

  useEffect(() => {
    // Store.$searchTerm.pipe(distinctUntilChanged()).subscribe((value) => {
    //   if (value !== searchTerm) {
    //     setSearchTerm(value);
    //     if (value) {
    //       setShowAllFiles(false);
    //     } else {
    //       setShowAllFiles(true);
    //     }
    //   }
    // });

    Store.$discoveredFiles.pipe(distinctUntilChanged()).subscribe((value) => {
      setFiles(value);
    });

    Store.$filteredFiles.pipe(distinctUntilChanged()).subscribe((value) => {
      if (value.length > 0) {
        setFiles(value);
      } else {
        setFiles(Store.$discoveredFiles.value);
      }
    });
  }, []);

  return (
    <Box
      sx={{
        height: "80vh",
      }}
    >
      <List
        sx={{
          width: "100%",

          maxWidth: "100vw",
          bgcolor: "background.paper",
          overflow: "auto",
          maxHeight: "100%",
        }}
      >
        {files.map((file) => (
          <FileListItem value={file} key={file.id} />
        ))}
      </List>
    </Box>
  );
};
