White wolf web studio 
export function MessageThread({ conversationId }: { conversationId: string }) {  const [messages, setMessages] = useState<Message[]>([]);  const [aiEnabled, setAiEnabled] = useState(true);  const bottomRef = useRef<HTMLDivElement>(null);  useEffect(()
