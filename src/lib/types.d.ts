import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

type sidebarOptionType = {
    title: string;
    navigateTo: string;
    icon?: React.ReactNode;
  };

type iconType = {
    size?:number,
    color?:string,
    className?:string
}