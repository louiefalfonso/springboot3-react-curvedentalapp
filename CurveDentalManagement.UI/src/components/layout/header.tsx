import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface HeaderProps { Title: string;}

const Header = ({ Title }: HeaderProps) => {

  const API_BASE_URL = import.meta.env.VITE_BASE_URI_AUTH;
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { toast.error("You are not logged in.");
        return;
      }
      await axios.post(`${API_BASE_URL}/logout`, {token,});
      localStorage.removeItem("token");
      toast.success("Logout Successful!");
      navigate("/login");
    } catch {
      toast.error("Error logging out.");
    }
  };

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3 flex-grow">
            <SidebarTrigger />
            <h1 className="header-title">{Title}</h1>
          </div>
          <Button className="mr-4 bg-sky-800 hover:bg-sky-950" aria-label="Logout" onClick={handleLogout}>
            <LogOut /> Logout
          </Button>
        </header>
      );
}

export default Header;