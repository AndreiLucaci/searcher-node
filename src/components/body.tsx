import React, { useState } from "react";
import { Store } from "../stores";
import { Dirent } from "node:fs";
import { List } from "@mui/material";
import { FileListItem } from "./listItem";
import { distinctUntilChanged } from "rxjs";

export const Body: React.FC = () => {
  const [showAllFiles, setShowAllFiles] = useState(true);

  Store.$searchTerm.pipe(distinctUntilChanged()).subscribe((value) => {
    if (value) {
      setShowAllFiles(false);
    } else {
      setShowAllFiles(true);
    }
  });

  const renderFiles = () => {
    let files: Dirent[] = [];

    if (showAllFiles) {
      files = Store.$discoveredFiles.value;
    } else {
      files = Store.$filteredFiles.value
        .sort((a, b) => a.refIndex - b.refIndex)
        .map((x) => x.item);
    }

    return files.map((file) => (
      <FileListItem key={file.parentPath} value={file} />
    ));
  };

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {/* {renderFiles()} */}
      </List>
    </div>
  );
};
