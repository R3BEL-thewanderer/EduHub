import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Sparkles, Expand, X, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendChatMessage } from '@/lib/chatApi';

interface AIChatWidgetProps {
  subjectName: string;
  subjectId?: string;
}

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  attachedFile?: string;
}

export function AIChatWidget({ subjectName, subjectId }: AIChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: `Hey! I'm your AI tutor for **${subjectName}**. Got any questions or a file you want me to explain?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputValue.trim() && !attachedFile) || isTyping) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue || (attachedFile ? `Analyze this file: ${attachedFile}` : ''),
      attachedFile: attachedFile || undefined
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    const currentInput = inputValue || (attachedFile ? `Please analyze the attached file: ${attachedFile}` : '');
    const currentFile = attachedFile;
    setInputValue('');
    setAttachedFile(null);
    setIsTyping(true);

    // Build history from previous messages (skip the initial bot greeting)
    const history = updatedMessages.slice(1).map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await sendChatMessage(
        currentInput,
        subjectId || subjectName,
        history,
        currentFile || undefined,
      );

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response.reply
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'Something went wrong. Please try again.'
      }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="bg-white rounded-xl border-4 border-black overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col h-[500px]">
      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" />

      {/* Header */}
      <div className="bg-sage px-4 py-3 border-b-4 border-black flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-black" />
          <span className="font-black text-black uppercase tracking-wider text-sm">AI Tutor</span>
        </div>
        <Link to={`/chat?subject=${encodeURIComponent(subjectName)}&id=${encodeURIComponent(subjectId || subjectName)}`} className="p-1.5 bg-white border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          <Expand className="w-4 h-4 text-black" />
        </Link>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 flex flex-col">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
            >
              {msg.attachedFile && (
                <div className="mb-1 flex items-center gap-1.5 bg-white border-2 border-black px-2 py-1 rounded text-xs font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <FileText className="w-3 h-3 text-blue-500" />
                  {msg.attachedFile}
                </div>
              )}
              <div 
                className={`px-4 py-3 rounded-2xl border-4 border-black text-sm font-bold leading-relaxed shadow-[4px_4px_0px_rgba(0,0,0,1)] ${
                  msg.role === 'user' ? 'bg-sky rounded-br-none' : 'bg-white rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col max-w-[85%] self-start items-start">
            <div className="px-4 py-3 rounded-2xl rounded-bl-none border-4 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-1">
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-black rounded-full" />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-black rounded-full" />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-black rounded-full" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t-4 border-black bg-white p-3 flex flex-col z-10">
        {attachedFile && (
          <div className="flex items-center justify-between bg-gray-100 border-2 border-black px-3 py-1.5 rounded mb-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-xs font-bold truncate">{attachedFile}</span>
            </div>
            <button onClick={() => setAttachedFile(null)} className="ml-2 p-1 hover:bg-gray-300 rounded">
              <X className="w-3 h-3 text-black" />
            </button>
          </div>
        )}
        <form onSubmit={handleSend} className="flex gap-2">
          <Button 
            type="button"
            variant="outline" 
            className="px-2 border-2 border-black bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
            onClick={() => fileInputRef.current?.click()}
            title="Attach a file"
          >
            <Paperclip className="w-4 h-4 text-black" />
          </Button>
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 border-2 border-black bg-white rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-shadow font-bold text-sm"
          />
          <Button 
            type="submit" 
            className="px-3 bg-black text-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-black hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
            disabled={(!inputValue.trim() && !attachedFile) || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
