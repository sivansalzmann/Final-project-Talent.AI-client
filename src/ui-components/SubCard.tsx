import React, { ReactNode, Ref } from "react";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

const SubCard = React.forwardRef(
  (
    {
      children,
      className,
      content,
      contentClass,
      secondary,
      sx = {},
      contentSX = {},
      title,
      ...others
    }: SubCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <Card
        ref={ref}
        sx={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#ECF0F9",
          borderRadius: "10px",
          ":hover": {
            boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
          },
          overflow: "hidden",
          ...sx,
        }}
        {...others}
      >
        {/* card header and action */}
        {title && (
          <CardHeader sx={{ p: 2.5 }} title={title} action={secondary} />
        )}

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
  }
);

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
