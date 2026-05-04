import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Configuration, UserControllerApi } from "../../api";
import Autocomplete from "../Autocomplete/Autocomplete";

const userApi = new UserControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

interface CreateConversationDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const CreateConversationDialog = ({
  isOpen,
  onClose,
}: CreateConversationDialogProps) => {
  const [searchValue, setSearchValue] = useState("");
  const { data: users } = useQuery({
    queryKey: ["users", searchValue],
    queryFn: () => userApi.getAllUsers({ q: searchValue }),
    gcTime: 0,
  });

  const uidList = users?.map((user) => user.uid ?? "") || [];

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box">
        <header className="text-lg font-bold">Create conversation</header>
        <Autocomplete
          options={uidList}
          onInputChange={(val) => setSearchValue(val)}
          onSelect={(uid) => console.log(uid)}
        />
        <footer className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </dialog>
  );
};

export default CreateConversationDialog;
