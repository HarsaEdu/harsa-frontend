import clsx from "clsx";

function Input(props) {
  const { label, id, error, register, name, type } = props;

  return (
    <div className="flex flex-col mb-4 px-5">
      <label className="text-black font-bold mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        className={clsx(
          "border rounded-md bg-slate-50 py-4 border-red-500 text-black  p-2 focus:outline-none w-full",
          !error && "border-gray-200"
        )}
        placeholder={label}
        type={type}
        {...(register
          ? register(name, {
              valueAsNumber: type === "number" ? true : false,
            })
          : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="break-words text-sm font-light text-red-500">
            {/* Ingat digantikan dengan library icon */}
            <span className="me-2">⚠️</span>
            {error}
          </span>
        </label>
      )}
    </div>
  );
}

function TextArea(props) {
  const { label, id, error, register, name } = props;

  return (
    <div className="flex flex-col mb-4 p-2">
      <label className="text-black font-bold mb-1" htmlFor={id}>
        {label}
      </label>
      <textarea
        className={clsx(
          "border rounded-md bg-slate-50 py-4 border-red-500 text-black  p-2 focus:outline-none w-full",
          !error && "border-gray-200"
        )}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="break-words text-sm font-light text-red-500">
            {/* Ingat digantikan dengan library icon */}
            <span className="me-2">⚠️</span>
            {error}
          </span>
        </label>
      )}
    </div>
  );
}

function Select(props) {
  const { label, placeholder, id, error, options, register, name } = props;

  return (
    <div className="flex flex-col mb-4">
      <label className="text-black font-bold mb-1" htmlFor={id}>
        {label}
      </label>
      <select
        className={clsx(
          "border rounded-md bg-slate-50 py-4 border-red-500 text-black  p-2 focus:outline-none w-full",
          !error && "border-gray-200"
        )}
        defaultValue=""
        {...(register ? register(name) : {})}
        {...props}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="break-words text-sm font-light text-red-500">
            {/* Ingat digantikan dengan library icon */}
            <span className="me-2">⚠️</span>
            {error}
          </span>
        </label>
      )}
    </div>
  );
}

export { Input, TextArea, Select };
