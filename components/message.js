export default function Message({ message }) {
  return (
    <li className="bg-white border rounded-lg p-2 mb-2">
      <span className="text-gray-800 text-sm font-semibold">
        {message.nickname}
      </span>
      <span dangerouslySetInnerHTML={{ __html: message.message }}></span>
    </li>
  );
}
