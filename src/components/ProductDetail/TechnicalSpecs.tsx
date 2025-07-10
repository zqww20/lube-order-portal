import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SpecItem {
  key: string;
  value: string;
}

interface TechnicalSpecsProps {
  specs: SpecItem[];
}

const TechnicalSpecs = ({ specs }: TechnicalSpecsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayLimit = 8;
  const hasMoreSpecs = specs.length > displayLimit;
  const visibleSpecs = isExpanded ? specs : specs.slice(0, displayLimit);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-heading">Technical Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="space-y-0">
            {visibleSpecs.map((spec, index) => (
              <div 
                key={spec.key}
                className={`grid grid-cols-2 py-3 ${
                  index !== visibleSpecs.length - 1 ? 'border-b border-border/50' : ''
                }`}
              >
                <div className="text-sm font-medium text-foreground pr-4">
                  {spec.key}
                </div>
                <div className="text-sm text-muted-foreground break-words">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
          
          {hasMoreSpecs && (
            <div className="mt-4 pt-4 border-t border-border/50">
              {!isExpanded ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      See all specs ({specs.length} total)
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Complete Technical Specifications</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-0 mt-4">
                      {specs.map((spec, index) => (
                        <div 
                          key={spec.key}
                          className={`grid grid-cols-2 py-3 ${
                            index !== specs.length - 1 ? 'border-b border-border/50' : ''
                          }`}
                        >
                          <div className="text-sm font-medium text-foreground pr-4">
                            {spec.key}
                          </div>
                          <div className="text-sm text-muted-foreground break-words">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                >
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show less
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalSpecs;