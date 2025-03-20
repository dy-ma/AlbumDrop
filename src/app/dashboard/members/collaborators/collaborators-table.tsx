import MembersSidebar from "../members-sidebar";

export default function CollaboratorsTable() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex gap-6">
        {/* Sidebar on the left */}
        <MembersSidebar page="collaborators" />

        {/* Main Content Area */}
        <div className="flex-1 max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Collaborators</h2>
              <p>Share projects with external collaborators. Collaborator access is limited to the projects you invite them to.</p>
              <p>The Collaboration feature is still under construction. Please come back later.</p>
            </div>
          </div>

          {/* Members Table */}
        </div>
      </div>
    </div>
  );
}