const MAX_DRAFTS = 50;
const DRAFT_INDEX_KEY = "note-draft-index";

const getDraftKey = (note_id: number) => `note_draft_${note_id}`;

const addDraftToIndex = (note_id: number) => {
    const raw = localStorage.getItem(DRAFT_INDEX_KEY);
    const index = raw ? (JSON.parse(raw) as number[]) : [];

    const existing = index.filter((id) => id !== note_id);
    existing.push(note_id);

    if (existing.length > MAX_DRAFTS) {
        const toDelete = existing.shift();
        if (toDelete !== undefined) deleteDraft(toDelete);
    }

    localStorage.setItem(DRAFT_INDEX_KEY, JSON.stringify(existing));
};

const deleteDraftFromIndex = (note_id: number) => {
    const raw = localStorage.getItem(DRAFT_INDEX_KEY);
    const index = raw ? (JSON.parse(raw) as number[]) : [];

    const existing = index.filter((id) => id !== note_id);

    localStorage.setItem(DRAFT_INDEX_KEY, JSON.stringify(existing));
};

const updateDraft = (note_id: number, title: string, content: string, completed: boolean) => {
    const key = getDraftKey(note_id);

    const draft = {
        title,
        content,
        completed,
    };

    try {
        localStorage.setItem(key, JSON.stringify(draft));
        addDraftToIndex(note_id);
    } catch (error) {
        console.warn("failed to save draft. LocalStorage might be full.");
    }
};

const deleteDraft = (note_id: number) => {
    const key = getDraftKey(note_id);
    localStorage.removeItem(key);
    deleteDraftFromIndex(note_id);
};

export { getDraftKey, updateDraft, deleteDraft };
