import EmptyState from "@/components/EmptyState";

type UserPageProps = {};

const UserPage = ({}: UserPageProps) => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <EmptyState />
    </div>
  );
};

export default UserPage;
