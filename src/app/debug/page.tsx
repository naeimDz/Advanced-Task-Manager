// app/debug/page.tsx
"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useNotes } from "@/hook/useNotes";
import { useEffect, useRef } from "react";

export default function DebugPage() {
  // 🎯 Render counter
  const renderCount = useRef(0);
  renderCount.current++;
  
  console.log(`🔄 DebugPage - Render #${renderCount.current}`);

  const { user, isReady: authReady } = useAuthContext();
  const { notes, addNote, loading, error, isReady: notesReady, refreshNotes } = useNotes();

  // 🔍 تتبع تغييرات القيم المهمة
  const prevValues = useRef({
    user: null as any,
    authReady: false,
    notesCount: 0,
    loading: false,
    notesReady: false
  });

  // تسجيل التغييرات
  if (prevValues.current.user?.uid !== user?.uid) {
    console.log('👤 User changed:', {
      from: prevValues.current.user?.uid || 'null',
      to: user?.uid || 'null'
    });
    prevValues.current.user = user ?? "";
  }

  if (prevValues.current.authReady !== authReady) {
    console.log('🔐 AuthReady changed:', {
      from: prevValues.current.authReady,
      to: authReady
    });
    prevValues.current.authReady = authReady;
  }

  if (prevValues.current.notesCount !== notes.length) {
    console.log('📝 Notes count changed:', {
      from: prevValues.current.notesCount,
      to: notes.length
    });
    prevValues.current.notesCount = notes.length;
  }

  if (prevValues.current.loading !== loading) {
    console.log('⏳ Loading changed:', {
      from: prevValues.current.loading,
      to: loading
    });
    prevValues.current.loading = loading;
  }

  if (prevValues.current.notesReady !== notesReady) {
    console.log('📋 NotesReady changed:', {
      from: prevValues.current.notesReady,
      to: notesReady
    });
    prevValues.current.notesReady = notesReady;
  }

  // 🎯 تتبع useEffect للمستخدم
  useEffect(() => {
    console.log('⚡ User effect triggered:', {
      hasUser: !!user?.uid,
      userUid: user?.uid,
      authReady,
      notesReady
    });

    // لا نحتاج getUserNotes لأن useNotes يدير هذا تلقائياً
    if (user?.uid) {
      console.log('✅ User is ready, useNotes will handle fetching');
    } else {
      console.log('❌ No user, notes will be cleared');
    }
  }, [user?.uid, authReady]);

  const handleAddNote = async () => {
    console.log('➕ Adding note started...');
    
    const startTime = Date.now();
    
    const success = await addNote({
      title: "Test Note",
      content: `Test note at ${new Date().toLocaleString()}`,
      isPublic: false,
      tags: [],
      linkedNotes: [],
    });

    const duration = Date.now() - startTime;
    
    if (success) {
      console.log(`✅ Note added successfully in ${duration}ms`);
    } else {
      console.log(`❌ Failed to add note after ${duration}ms`);
    }

    // لا نحتاج getUserNotes() لأن addNote يحدث الـ state تلقائياً
  };

  const handleRefreshNotes = () => {
    console.log('🔄 Manual refresh triggered');
    refreshNotes();
  };

  // 🎯 Current state logging
  console.log('🎯 Current DebugPage state:', {
    renderCount: renderCount.current,
    hasUser: !!user,
    userUid: user?.uid,
    authReady,
    notesCount: notes.length,
    loading,
    notesReady,
    hasError: !!error
  });

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-2">🧪 Debug Page</h1>
      
      {/* Debug Info Panel */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold mb-2">🔍 Debug Info:</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Renders: <span className="font-mono">{renderCount.current}</span></div>
          <div>Auth Ready: <span className={`font-mono ${authReady ? 'text-green-600' : 'text-red-600'}`}>{authReady.toString()}</span></div>
          <div>Notes Ready: <span className={`font-mono ${notesReady ? 'text-green-600' : 'text-red-600'}`}>{notesReady.toString()}</span></div>
          <div>Loading: <span className={`font-mono ${loading ? 'text-yellow-600' : 'text-gray-600'}`}>{loading.toString()}</span></div>
        </div>
      </div>

      <section className="mb-4">
        <h2 className="font-semibold">👤 User Info:</h2>
        {user ? (
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify({
              uid: user.uid,
              name: user.name,
              email: user.email
            }, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500">Not logged in</p>
        )}
      </section>

      <section className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">📝 Notes ({notes.length}):</h2>
          <button
            onClick={handleRefreshNotes}
            className="text-sm px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={!user}
          >
            🔄 Refresh
          </button>
        </div>

        {error && (
          <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-600 text-sm">❌ {error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <p>Loading notes...</p>
          </div>
        ) : notes.length ? (
          <ul className="space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="p-2 bg-white border rounded">
                <div className="text-sm text-gray-500 mb-1">ID: {note.id}</div>
                <div className="font-medium">{note.title}</div>
                <div className="text-gray-700">{note.content}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {note.createdAt?.toDate?.()?.toLocaleString() || 'No date'}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>No notes found</p>
            {!authReady && <p className="text-sm">Waiting for authentication...</p>}
          </div>
        )}
      </section>

      <div className="flex gap-2">
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!user || loading}
        >
          ➕ Add Test Note
        </button>
        
        <button
          onClick={() => {
            console.log('🎯 Manual state dump:', {
              user,
              notes,
              loading,
              error,
              authReady,
              notesReady
            });
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          📊 Dump State
        </button>
      </div>

      {/* Console Instructions */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">
          💡 <strong>Console Tracking:</strong> افتح Developer Tools (F12) وتابع Console للتتبع المفصل
        </p>
      </div>
    </main>
  );
}