export interface Authregister {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface Authlogin {
  email: string;
  password: string;
}

export interface ChatWindowProps {
  contact: {
    _id: string;
    name: string;
    avatar?:string;
  };
  messages: {
    _id: string;
    sender: { _id: string; name: string };
    content: string;
    isMe:boolean
  }[];
  onSend: (text: string) => void;
}

export interface SidebarProps {
  contacts: {
    _id: string;
    name: string;
    avatar?: string;
  }[];
  activeId: string | null;
  onSelect: (contact: { _id: string; name: string }) => void;
}

export interface InputFieldProps {
  label: string;
  type: string;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}

export type FormErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
};

export interface User {
  _id: string;
  name: string;
  avatar?: string;
}

export interface Message {
  _id: string;
  sender: User;
  conversation: string;
  content: string;
  createdAt: string;
  isMe: boolean;
}

export interface Conversation {
  _id: string;
  name: string;
  type: "private" | "group";
  members: string[];
  contact: User;
}