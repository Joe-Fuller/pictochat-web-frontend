export default function Message({ message }) {
  return (
    <li className="relative bg-white border-red-600 border-2 rounded-lg p-2 mb-2 text-black">
      <div className="absolute top-0 left-0 pl-1 bg-red-400 text-sm font-semibold rounded-br-md rounded-tl border-2 border-red-600">
        {message.nickname}
      </div>
      <div
        className="pl-8"
        dangerouslySetInnerHTML={{ __html: message.message }}
      ></div>
    </li>
  );
}
