import React, { FC, ReactNode, Ref } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

const SubCard: FC<SubCardProps> = ({
  children,
  className,
  content,
  contentClass,
  secondary,
  sx = {},
  contentSX = {},
  title,
  ...others
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ECF0F9",
        borderRadius: "10px",
        ":hover": {
          boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
        },
        overflow: "scroll",
        ...sx,
      }}
      {...others}
    >
      {/* content & header divider */}
      {title && (
        <Divider
          sx={{
            opacity: 1,
          }}
        />
      )}

      {/* card content */}
      {content && (
        <CardContent
          sx={{ p: 2.5, ...contentSX }}
          className={contentClass || ""}
        >
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
};

SubCard.defaultProps = {
  content: true,
};

interface SubCardProps {
  children: ReactNode | string | null;
  content?: boolean;
  className?: string;
  contentClass?: string;
  secondary?: ReactNode | string | {};
  sx?: {};
  contentSX?: {};
  title?: ReactNode | string | {};
}
export default SubCard;
