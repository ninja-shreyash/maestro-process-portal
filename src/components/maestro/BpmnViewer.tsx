import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    FileText, 
    ZoomIn, 
    ZoomOut, 
    RotateCcw, 
    Download,
    Eye,
    Code,
    Maximize2
} from 'lucide-react';
interface BpmnViewerProps {
    xml: string;
    className?: string;
}
export function BpmnDiagramViewer({ xml, className = '' }: BpmnViewerProps) {
    const [viewMode, setViewMode] = useState<'visual' | 'xml'>('visual');
    const [zoom, setZoom] = useState(100);
    // Parse basic BPMN elements from XML for visual representation
    const parseElements = (xmlString: string) => {
        const elements = [];
        // Extract process elements using regex (simplified parsing)
        const startEventMatch = xmlString.match(/<bpmn:startEvent[^>]*name="([^"]*)"[^>]*>/g);
        const taskMatches = xmlString.match(/<bpmn:task[^>]*name="([^"]*)"[^>]*>/g) || 
                           xmlString.match(/<bpmn:userTask[^>]*name="([^"]*)"[^>]*>/g) ||
                           xmlString.match(/<bpmn:serviceTask[^>]*name="([^"]*)"[^>]*>/g);
        const endEventMatch = xmlString.match(/<bpmn:endEvent[^>]*name="([^"]*)"[^>]*>/g);
        const gatewayMatches = xmlString.match(/<bpmn:exclusiveGateway[^>]*name="([^"]*)"[^>]*>/g) ||
                              xmlString.match(/<bpmn:parallelGateway[^>]*name="([^"]*)"[^>]*>/g);
        if (startEventMatch) {
            startEventMatch.forEach(match => {
                const nameMatch = match.match(/name="([^"]*)"/);
                elements.push({
                    type: 'startEvent',
                    name: nameMatch ? nameMatch[1] : 'Start',
                    id: `start_${elements.length}`
                });
            });
        }
        if (taskMatches) {
            taskMatches.forEach(match => {
                const nameMatch = match.match(/name="([^"]*)"/);
                elements.push({
                    type: 'task',
                    name: nameMatch ? nameMatch[1] : 'Task',
                    id: `task_${elements.length}`
                });
            });
        }
        if (gatewayMatches) {
            gatewayMatches.forEach(match => {
                const nameMatch = match.match(/name="([^"]*)"/);
                elements.push({
                    type: 'gateway',
                    name: nameMatch ? nameMatch[1] : 'Gateway',
                    id: `gateway_${elements.length}`
                });
            });
        }
        if (endEventMatch) {
            endEventMatch.forEach(match => {
                const nameMatch = match.match(/name="([^"]*)"/);
                elements.push({
                    type: 'endEvent',
                    name: nameMatch ? nameMatch[1] : 'End',
                    id: `end_${elements.length}`
                });
            });
        }
        return elements;
    };
    const elements = parseElements(xml);
    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
    const handleResetZoom = () => setZoom(100);
    const getElementIcon = (type: string) => {
        switch (type) {
            case 'startEvent':
                return '⚪';
            case 'endEvent':
                return '🔴';
            case 'task':
                return '📋';
            case 'gateway':
                return '◆';
            default:
                return '⚫';
        }
    };
    const getElementColor = (type: string) => {
        switch (type) {
            case 'startEvent':
                return 'bg-green-100 border-green-300 text-green-800';
            case 'endEvent':
                return 'bg-red-100 border-red-300 text-red-800';
            case 'task':
                return 'bg-blue-100 border-blue-300 text-blue-800';
            case 'gateway':
                return 'bg-yellow-100 border-yellow-300 text-yellow-800';
            default:
                return 'bg-gray-100 border-gray-300 text-gray-800';
        }
    };
    return (
        <div className={`space-y-4 ${className}`}>
            {/* Toolbar */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                    <Button
                        variant={viewMode === 'visual' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('visual')}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Visual
                    </Button>
                    <Button
                        variant={viewMode === 'xml' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('xml')}
                    >
                        <Code className="w-4 h-4 mr-2" />
                        XML Source
                    </Button>
                </div>
                {viewMode === 'visual' && (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleZoomOut}>
                            <ZoomOut className="w-4 h-4" />
                        </Button>
                        <span className="text-sm font-medium min-w-[60px] text-center">
                            {zoom}%
                        </span>
                        <Button variant="outline" size="sm" onClick={handleZoomIn}>
                            <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleResetZoom}>
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
            {/* Content */}
            <Card>
                <CardContent className="p-0">
                    {viewMode === 'visual' ? (
                        <div className="min-h-[500px] bg-white border rounded-lg overflow-hidden">
                            <div 
                                className="p-8 transition-transform origin-top-left"
                                style={{ transform: `scale(${zoom / 100})` }}
                            >
                                {elements.length > 0 ? (
                                    <div className="space-y-6">
                                        <div className="text-center mb-8">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                Process Flow Diagram
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Simplified visual representation of BPMN elements
                                            </p>
                                        </div>
                                        {/* Flow visualization */}
                                        <div className="flex flex-col items-center space-y-4">
                                            {elements.map((element, index) => (
                                                <div key={element.id} className="flex flex-col items-center">
                                                    <div className={`
                                                        px-4 py-3 rounded-lg border-2 shadow-sm
                                                        min-w-[200px] text-center
                                                        ${getElementColor(element.type)}
                                                    `}>
                                                        <div className="flex items-center justify-center gap-2 mb-1">
                                                            <span className="text-lg">
                                                                {getElementIcon(element.type)}
                                                            </span>
                                                            <Badge variant="outline" className="text-xs">
                                                                {element.type}
                                                            </Badge>
                                                        </div>
                                                        <div className="font-medium text-sm">
                                                            {element.name}
                                                        </div>
                                                    </div>
                                                    {/* Arrow to next element */}
                                                    {index < elements.length - 1 && (
                                                        <div className="flex flex-col items-center py-2">
                                                            <div className="w-0.5 h-4 bg-gray-400"></div>
                                                            <div className="text-gray-400">▼</div>
                                                            <div className="w-0.5 h-4 bg-gray-400"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {/* Element summary */}
                                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-medium text-sm mb-3">Process Summary</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                                <div className="text-center">
                                                    <div className="font-semibold text-green-600">
                                                        {elements.filter(e => e.type === 'startEvent').length}
                                                    </div>
                                                    <div className="text-gray-600">Start Events</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-semibold text-blue-600">
                                                        {elements.filter(e => e.type === 'task').length}
                                                    </div>
                                                    <div className="text-gray-600">Tasks</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-semibold text-yellow-600">
                                                        {elements.filter(e => e.type === 'gateway').length}
                                                    </div>
                                                    <div className="text-gray-600">Gateways</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-semibold text-red-600">
                                                        {elements.filter(e => e.type === 'endEvent').length}
                                                    </div>
                                                    <div className="text-gray-600">End Events</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                                        <FileText className="w-16 h-16 mb-4" />
                                        <p className="text-lg font-medium mb-2">No BPMN Elements Found</p>
                                        <p className="text-sm">
                                            The BPMN XML doesn't contain recognizable process elements.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <ScrollArea className="h-[500px]">
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">BPMN XML Source</h4>
                                    <Button variant="outline" size="sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </div>
                                <pre className="text-xs bg-gray-50 p-4 rounded border overflow-auto">
                                    {xml}
                                </pre>
                            </div>
                        </ScrollArea>
                    )}
                </CardContent>
            </Card>
            {/* Info Panel */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        BPMN Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">XML Size:</span>
                        <span className="font-mono">{xml.length} characters</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Elements Found:</span>
                        <span className="font-mono">{elements.length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">View Mode:</span>
                        <Badge variant="outline" className="text-xs">
                            {viewMode === 'visual' ? 'Visual Diagram' : 'XML Source'}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}