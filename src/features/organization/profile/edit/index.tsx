import EditOrganizerForm from "./components/EditOrganizerForm";

const OrganizerEditProfilePage = () => {
  return (
    <div className="container mx-auto px-4 space-y-4">
         <h1 className="mx-auto  w-fit rounded-md bg-white px-2 py-4 text-center text-2xl font-bold md:text-3xl">
        Edit Organizer Profile
      </h1>
      <EditOrganizerForm />
    </div>
  );
};

export default OrganizerEditProfilePage;
