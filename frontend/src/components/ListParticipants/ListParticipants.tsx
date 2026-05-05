interface ListParticipantsProps {
  participantUids: string[];
  onRemoveUser?: (uid: string) => void;
}

const ListParticipants = ({
  participantUids,
  onRemoveUser,
}: ListParticipantsProps) => {
  return (
    <>
      {participantUids.map((uid) => (
        <div
          className="badge badge-neutral badge-outline"
          key={uid}
          onClick={() => onRemoveUser?.(uid)}
        >
          {uid}
        </div>
      ))}
    </>
  );
};

export default ListParticipants;
