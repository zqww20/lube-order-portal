import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

interface DocumentItem {
  name: string;
  url: string;
}

interface DocumentationProps {
  documents: DocumentItem[];
}

const Documentation = ({ documents }: DocumentationProps) => {
  if (!documents || documents.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-heading">Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="relative">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div className="absolute -bottom-1 -right-1 w-3 h-1 bg-success rounded-sm" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {doc.name}
                </p>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Documentation;