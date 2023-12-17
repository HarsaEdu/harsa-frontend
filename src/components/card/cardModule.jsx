const cardModule = ({ StudentName, RoleUser, AddressUser }) => {
  return (
    <div className="flex items-center space-x-3 space-y-1 rounded-sm bg-slate-100 p-2">
      <div className="relative h-8 w-8 rounded-full before:absolute before:bottom-0 before:right-0 before:h-2 before:w-2 before:rounded-full before:bg-green-500 before:ring-1 before:ring-white">
        <img
          className="rounded-full"
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          alt=""
        />
      </div>
      <div className="flex flex-col pl-3">
        <div className="text-lg font-semibold text-black">{StudentName}</div>
        <div className="flex space-x-2">
          <span className="text-sm font-semibold tracking-tight text-black">
            {RoleUser}
          </span>
          <span className="text-sm font-semibold tracking-tight text-black">
            {AddressUser}
          </span>
        </div>
      </div>
    </div>
  );
};

export default cardModule;
