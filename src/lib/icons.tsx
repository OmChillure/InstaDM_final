import { CircleUser, Home, Menu, MessagesSquare, Radio, Users } from "lucide-react";
import { iconType } from "./types";

const icons = {
  home: ({ size = 16, color = "#000", className }: iconType) => (
    <Home size={size} color={color} className={className ?? ""} />
  ),
  users: ({ size = 16, color = "#000", className }: iconType) => (
    <Users size={size} color={color} className={className ?? ""} />
  ),
  broadcast: ({ size = 16, color = "#000", className }: iconType) => (
    <Radio size={size} color={color} className={className ?? ""} />
  ),
  messages: ({ size = 16, color = "#000", className }: iconType) => (
    <MessagesSquare size={size} color={color} className={className ?? ""} />
  ),
  profile: ({ size = 16, color = "#000", className }: iconType) => (
    <CircleUser size={size} color={color} className={className ?? ""} />
  ),
  menu: ({ size = 16, color = "#000", className }: iconType) => (
    <Menu size={size} color={color} className={className ?? ""} />
  ),
};

export default icons;
