import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Dirent } from "node:fs";
import { Store } from "../stores";

export type FileListItemProps = {
  value: Dirent;
};

export const FileListItem: React.FC<FileListItemProps> = (
  props: FileListItemProps
) => {
  const onDoubleClick = () => {
    Store.$fileToBeOpened.next(props.value);
  };

  return (
    <ListItem onDoubleClick={onDoubleClick}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.value.name}
        secondary={props.value.parentPath}
      />
    </ListItem>
  );
};
