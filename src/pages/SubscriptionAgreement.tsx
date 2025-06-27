
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  CreditCard, 
  Building, 
  Copy, 
  CheckCircle,
  ArrowLeft 
} from 'lucide-react';

const SubscriptionAgreement = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleAgreementCheck = (checked: boolean) => {
    setIsAgreed(checked);
    if (checked) {
      setShowPaymentInfo(true);
    } else {
      setShowPaymentInfo(false);
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirm = () => {
    if (isAgreed) {
      alert('Thank you for your subscription! Please complete the transfer according to the payment information. We will activate your official account after receiving the payment.');
      window.close();
    }
  };

  const paymentInfo = {
    bankName: "Industrial and Commercial Bank of China",
    accountName: "Shenzhen Technology Innovation Co., Ltd.",
    accountNumber: "4000 0000 0000 0000 0000",
    swiftCode: "ICBKCNBJ",
    amount: "$4,299",
    purpose: "Kilimax ERP System Official Subscription Fee"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => window.close()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Close
          </Button>
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Kilimax ERP Official Subscription Agreement</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agreement Content */}
          <div className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl">Subscription Service Agreement</CardTitle>
                <CardDescription>
                  Welcome to subscribe to the Kilimax Enterprise Resource Planning System (hereinafter referred to as "the System"). Please read the following terms and conditions carefully.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full border rounded-lg p-4">
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">1. Subscription Period</h4>
                      <p className="text-gray-600 mb-3">
                        The official subscription period is one year, calculated from the date of payment confirmation. During the subscription period, you can use all functions of the system.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">2. Fee Description</h4>
                      <p className="text-gray-600 mb-3">
                        The official subscription fee is $4,299/year. The fee includes system usage rights, technical support, regular updates, and other services.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">3. Service Content</h4>
                      <p className="text-gray-600 mb-3">
                        Official subscription includes complete ERP functional modules, unlimited data storage, professional technical support, system customization services, etc.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">4. Data Security</h4>
                      <p className="text-gray-600 mb-3">
                        We commit to protecting your data security using bank-level encryption technology. We provide regular data backups and disaster recovery services.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">5. Technical Support</h4>
                      <p className="text-gray-600 mb-3">
                        Official subscription users enjoy 7x24 hours technical support, including online customer service, phone support, on-site implementation, custom development, and other services.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">6. Renewal Policy</h4>
                      <p className="text-gray-600 mb-3">
                        We will notify you of renewal 30 days before the subscription expires. Renewal enjoys preferential pricing for existing customers.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">7. Refund Policy</h4>
                      <p className="text-gray-600 mb-3">
                        Within 30 days after the subscription takes effect, if you are not satisfied with the service, you can apply for a refund. After 30 days, refund applications will not be accepted.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">8. Service Level Agreement</h4>
                      <p className="text-gray-600 mb-3">
                        We commit to system availability of 99.9%. If the promised standard is not met, we will compensate service fees proportionally.
                      </p>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-xs text-blue-800">
                          <p className="font-medium">Privacy Statement</p>
                          <p>We strictly comply with relevant privacy regulations and will not disclose your business information to third parties.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreement"
                checked={isAgreed}
                onCheckedChange={handleAgreementCheck}
              />
              <label
                htmlFor="agreement"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the above official subscription agreement terms
              </label>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Payment Information</h3>
              {!showPaymentInfo && (
                <Badge variant="outline" className="text-xs">
                  Please agree to the agreement first
                </Badge>
              )}
            </div>

            {showPaymentInfo ? (
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-800">
                    Wire Transfer Information
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    Please complete the transfer according to the following information and keep the transfer receipt
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <p className="text-xs text-gray-500">Bank Name</p>
                        <p className="font-medium">{paymentInfo.bankName}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(paymentInfo.bankName, 'bank')}
                      >
                        {copiedField === 'bank' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <p className="text-xs text-gray-500">Account Name</p>
                        <p className="font-medium">{paymentInfo.accountName}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(paymentInfo.accountName, 'name')}
                      >
                        {copiedField === 'name' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <p className="text-xs text-gray-500">Account Number</p>
                        <p className="font-medium font-mono">{paymentInfo.accountNumber}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(paymentInfo.accountNumber.replace(/\s/g, ''), 'account')}
                      >
                        {copiedField === 'account' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <p className="text-xs text-gray-500">Transfer Amount</p>
                        <p className="font-bold text-lg text-green-600">{paymentInfo.amount}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy('4299', 'amount')}
                      >
                        {copiedField === 'amount' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <p className="text-xs text-gray-500">Transfer Purpose</p>
                        <p className="font-medium text-sm">{paymentInfo.purpose}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(paymentInfo.purpose, 'purpose')}
                      >
                        {copiedField === 'purpose' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Building className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-xs text-yellow-800">
                        <p className="font-medium">Important Reminder</p>
                        <p>Please ensure the transfer purpose information is accurate for us to quickly confirm your payment.</p>
                        <p>After completing the transfer, please contact customer service and provide the transfer receipt.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Please read and agree to the subscription agreement first</p>
                <p className="text-gray-500 text-sm">Payment information will be displayed after agreement</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button variant="outline" onClick={() => window.close()}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!isAgreed}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Confirm Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAgreement;
