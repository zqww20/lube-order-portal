import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Diamond, ExternalLink } from 'lucide-react';

interface ComplianceRestrictionsProps {
  isHazardous?: boolean;
  sdsUrl?: string;
}

const ComplianceRestrictions = ({ isHazardous = false, sdsUrl }: ComplianceRestrictionsProps) => {
  return (
    <Card className="w-full border-0 bg-background">
      <CardContent className="p-4 space-y-3">
        {/* SDS Link */}
        {sdsUrl && (
          <div className="flex items-center gap-3">
            <Diamond className="h-5 w-5 text-warning flex-shrink-0" />
            <Button 
              variant="link" 
              asChild
              className="text-left p-0 h-auto font-medium text-foreground hover:text-accent"
            >
              <a href={sdsUrl} target="_blank" rel="noopener noreferrer">
                View the Safety Data Sheet (SDS) for this item.
                <ExternalLink className="h-4 w-4 ml-1 inline" />
              </a>
            </Button>
          </div>
        )}
        
        {/* Hazardous Classification */}
        {isHazardous && (
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
            <span className="text-sm font-medium text-destructive">
              Class III DG – limited quantity
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceRestrictions;