import { databases } from '@/services/appwrite';
import { Models, Query } from 'appwrite';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

const databaseId = process.env.APPWRITE_DB_ID as string;
const collectionId = process.env.APPWRITE_FAVOURITES_COLLECTION_ID ?? 'favourites';

export function useFavourites() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocs = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await databases.listDocuments(databaseId, collectionId, [Query.equal('userId', user.$id)]);
      setDocuments(res.documents);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.$id]);

  return { documents, loading, error, refresh: fetchDocs };
} 