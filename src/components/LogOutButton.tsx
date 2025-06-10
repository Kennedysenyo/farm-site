import { logOut } from "@/actions/auth/log-out/logout";
import { Button } from "./ui/button";

export const LogOutButton = () => {
  const handleLogOutClick = async () => {
    const errorMessage = await logOut();
    if (errorMessage) console.log("show toast");
  };

  return (
    <Button
      variant="outline"
      className="from-accent/80 to-muted/80 cursor-pointer bg-gradient-to-br"
      onClick={handleLogOutClick}
    >
      Log Out
    </Button>
  );
};
