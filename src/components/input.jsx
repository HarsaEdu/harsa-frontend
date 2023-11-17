/* eslint-disable react/prop-types */
import clsx from "clsx";

function Input(props) {
  const { label, id, error, register, name, type } = props;

  return (
    <div className="mb-4 flex flex-col px-5">
      <label className="mb-1 font-bold text-black" htmlFor={id}>
        {label}
      </label>
      <input
        className={clsx(
          "w-full rounded-md border border-red-500 bg-slate-50 p-2  py-4 text-black focus:outline-none",
          !error && "border-gray-200",
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
    <div className="mb-4 flex flex-col p-2">
      <label className="mb-1 font-bold text-black" htmlFor={id}>
        {label}
      </label>
      <textarea
        className={clsx(
          "w-full rounded-md border border-red-500 bg-slate-50 p-2  py-4 text-black focus:outline-none",
          !error && "border-gray-200",
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
    <div className="mb-4 flex flex-col">
      <label className="mb-1 font-bold text-black" htmlFor={id}>
        {label}
      </label>
      <select
        className={clsx(
          "w-full rounded-md border border-red-500 bg-slate-50 p-2  py-4 text-black focus:outline-none",
          !error && "border-gray-200",
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
