export default function Message({ message, colours }) {
  return (
    <li
      className={`relative bg-white ${colours.borderColour} border-2 rounded-lg p-2 mb-2 text-black z-10`}
    >
      <div
        className={`absolute top-0 left-0 px-1 ${colours.bgColour} text-xl font-semibold rounded-br-md rounded-tl border-r-2 border-b-2 ${colours.borderColour} z-0`}
      >
        {message.nickname}
      </div>
      <div
        className="pl-8"
        dangerouslySetInnerHTML={{ __html: message.message }}
      ></div>
    </li>
  );
}
