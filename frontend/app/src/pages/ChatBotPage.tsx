import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Sparkles, X, FileText, ArrowLeft, Bot, User as UserIcon } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendChatMessage } from '@/lib/chatApi';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  attachedFile?: string;
}

export function ChatBotPage() {
  const [searchParams] = useSearchParams();
  const subjectName = searchParams.get('subject') || 'General Knowledge';
  const subjectId = searchParams.get('id') || subjectName;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: `Welcome to the EduHub AI Lab! I'm your dedicated tutor for **${subjectName}**. Feel free to ask me any questions, or attach a file and I'll analyze it for you.`
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

    // Build history (skip initial bot greeting)
    const history = updatedMessages.slice(1).map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await sendChatMessage(
        currentInput,
        subjectId,
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
    <div className="min-h-screen bg-sand font-inter flex flex-col">
      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" />

      {/* Navbar / Header */}
      <header className="bg-white border-b-4 border-black p-4 flex items-center justify-between sticky top-0 z-20 shadow-[0_4px_0_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] rounded">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-black" />
            <h1 className="font-display font-black text-2xl uppercase tracking-widest text-black">
              AI Tutor <span className="text-gray-400 hidden sm:inline">|</span> <span className="text-primary hidden sm:inline">{subjectName}</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-sage border-2 border-black px-3 py-1 font-bold text-sm uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] hidden sm:block">
            NVIDIA DiffusionGemma 26B
          </div>
          <div className="bg-green-300 border-2 border-black px-3 py-1 font-bold text-xs uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-pulse">
            ● Live
          </div>
        </div>
      </header>

      {/* Main Chat Layout */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col rounded-xl overflow-hidden mb-6">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full border-2 border-black flex-shrink-0 flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] ${msg.role === 'user' ? 'bg-sky' : 'bg-primary'}`}>
                      {msg.role === 'user' ? <UserIcon className="w-5 h-5 text-black" /> : <Bot className="w-5 h-5 text-white" />}
                    </div>

                    {/* Message Bubble */}
                    <div className="flex flex-col gap-1">
                      {msg.attachedFile && (
                        <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1.5 rounded font-bold text-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] self-end">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>{msg.attachedFile}</span>
                        </div>
                      )}
                      <div 
                        className={`px-5 py-4 border-4 border-black text-base sm:text-lg font-bold leading-relaxed shadow-[4px_4px_0px_rgba(0,0,0,1)] whitespace-pre-wrap ${
                          msg.role === 'user' 
                            ? 'bg-sky rounded-2xl rounded-tr-none' 
                            : 'bg-white rounded-2xl rounded-tl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex w-full justify-start"
              >
                <div className="flex gap-3 max-w-[75%] flex-row">
                  <div className="w-10 h-10 rounded-full border-2 border-black flex-shrink-0 flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-primary">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="px-5 py-4 border-4 border-black bg-white rounded-2xl rounded-tl-none shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-black rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-black rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-black rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-black bg-white p-4 sm:p-6 z-10 flex flex-col">
            {attachedFile && (
              <div className="flex items-center justify-between bg-gray-100 border-2 border-black px-4 py-2 rounded mb-4 shadow-[2px_2px_0px_rgba(0,0,0,1)] self-start max-w-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-bold truncate">{attachedFile}</span>
                </div>
                <button onClick={() => setAttachedFile(null)} className="ml-4 p-1 hover:bg-gray-300 rounded border-2 border-transparent hover:border-black transition-colors">
                  <X className="w-4 h-4 text-black" />
                </button>
              </div>
            )}
            <form onSubmit={handleSend} className="flex gap-3">
              <Button 
                type="button"
                variant="outline" 
                className="h-14 px-4 border-4 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] transition-all rounded-xl"
                onClick={() => fileInputRef.current?.click()}
                title="Attach a file"
              >
                <Paperclip className="w-6 h-6 text-black" />
              </Button>
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message your AI Tutor..."
                className="flex-1 h-14 text-lg border-4 border-black bg-gray-50 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-white transition-all font-bold px-6"
              />
              <Button 
                type="submit" 
                className="h-14 px-8 bg-primary text-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] transition-all rounded-xl uppercase font-black tracking-wider"
                disabled={(!inputValue.trim() && !attachedFile) || isTyping}
              >
                Send <Send className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
