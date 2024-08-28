import CreateSequence from '@/components/CreateSequence';
import SavedSequences from '@/components/SavedSequence';
import Preview from '@/components/Preview';

export default function SequencePage() {
  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Create Sequence</h1>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <CreateSequence />
            <SavedSequences />
          </div>
          <Preview />
        </div>
      </main>
    </div>
  );
}
