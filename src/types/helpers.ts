import { SvgIconTypeMap, TableCellProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { FunctionComponent } from "react";

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type ArrangementOrder = "asc" | "desc" | undefined;

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    })
  | React.ComponentClass<any>
  | FunctionComponent<any>;
export interface EnhancedTableHeadProps extends TableCellProps {
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type NavItemType = {
  id?: string;
  icon?: GenericCardProps["iconPrimary"];
  target?: boolean;
  external?: string;
  url?: string | undefined;
  type?: string;
  title?: React.ReactNode | string;
  color?: "primary" | "secondary" | "default" | undefined;
  caption?: React.ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
  // chip?: ChipProps;
};

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

export type LinkTarget = "_blank" | "_self" | "_parent" | "_top";
