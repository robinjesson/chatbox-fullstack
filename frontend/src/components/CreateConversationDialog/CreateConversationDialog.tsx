import { useQuery } from "@tanstack/react-query";
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
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => userApi.getAllUsers(),
  });

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box">
        <header className="text-lg font-bold">Create conversation</header>
        <Autocomplete<string>
          value=""
          options={users?.map((user) => user.uid) || []}
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
