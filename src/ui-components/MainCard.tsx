import React, { FC, Ref } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  CardProps,
  CardHeaderProps,
  CardContentProps,
} from "@mui/material";
import { KeyedObject } from "../types/helpers";

const MainCard: FC<MainCardProps> = ({
  border = true,
  boxShadow,
  children,
  content = true,
  contentClass = "",
  contentSX = {},
  secondary,
  shadow,
  sx = {},
  title,
  ...others
}) => {
  return (
    <Card
      {...others}
      sx={{
        ":hover": {
          boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
        },
        ...sx,
      }}
    >
      {title && (
        <CardHeader
          sx={headerSX}
          title={
            <Typography variant="body2" fontWeight="bold" color="secondary">
              {title}
            </Typography>
          }
          action={secondary}
        />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
};

const headerSX = {
  "& .MuiCardHeader-action": { mr: 0 },
};

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps["sx"];
  sx?: CardProps["sx"];
  secondary?: CardHeaderProps["action"];
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
}

export default MainCard;
