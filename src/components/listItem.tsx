import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Store } from "../stores";
import { ExtendedDirent } from "../utils/types";
import { FileIcon, defaultStyles } from "react-file-icon";

export type FileListItemProps = {
  value: ExtendedDirent;
};

export const FileListItem: React.FC<FileListItemProps> = (
  props: FileListItemProps
) => {
  const onDoubleClick = () => {
    Store.$fileToBeOpened.next(props.value);
  };

  return (
    <ListItem onDoubleClick={onDoubleClick}>
      <ListItemAvatar
        sx={{
          maxHeight: "32px",
          minWidth: "32px",
          maxWidth: "32px",
          width: "32px",
        }}
      >
        <FileIcon
          extension={props.value.ext}
          {...defaultStyles[
            props.value.ext as unknown as keyof typeof defaultStyles
          ]}
        />
      </ListItemAvatar>
      <ListItemText
        primary={props.value.name}
        secondary={props.value.parentPath}
      />
    </ListItem>
  );
};
