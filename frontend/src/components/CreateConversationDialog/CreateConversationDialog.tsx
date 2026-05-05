import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Configuration,
  ConversationControllerApi,
  UserControllerApi,
} from "../../api";
import Autocomplete from "../Autocomplete/Autocomplete";

const userApi = new UserControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

const conversationApi = new ConversationControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

interface CreateConversationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateConversationDialog = ({
  isOpen,
  onClose,
}: CreateConversationDialogProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [participantUids, setParticipantUids] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { data: users } = useQuery({
    queryKey: ["users", searchValue],
    queryFn: () => userApi.getAllUsers({ q: searchValue }),
    gcTime: 0,
  });
  const { mutate: createConversation } = useMutation({
    mutationKey: ["create-conversation"],
    mutationFn: () =>
      conversationApi.create({
        conversationRequest: {
          participantUids,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      onClose();
    },
  });

  const handleSelectUser = (uid: string) => {
    setParticipantUids((prev) => (prev.includes(uid) ? prev : [...prev, uid]));
  };

  const handleRemoveUser = (uid: string) => {
    setParticipantUids((prev) => prev.filter((id) => id !== uid));
  };

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box overflow-visible">
        <header className="text-lg font-bold">Create conversation</header>
        <div className="flex-out-row gap-2 pb-2 cursor-pointer">
          {participantUids.map((uid) => (
            <div
              className="badge badge-neutral badge-outline"
              key={uid}
              onClick={() => handleRemoveUser(uid)}
            >
              {uid}
            </div>
          ))}
        </div>
        <Autocomplete
          options={users?.map((user) => user.uid ?? "") || []}
          onInputChange={(val) => setSearchValue(val)}
          onSelect={handleSelectUser}
        />
        <footer className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
          <button className="btn" onClick={() => createConversation()}>
            Create
          </button>
        </footer>
      </div>
    </dialog>
  );
};

export default CreateConversationDialog;
