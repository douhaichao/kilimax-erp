
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  CreditCard, 
  Building, 
  Copy, 
  CheckCircle 
} from 'lucide-react';

interface TrialAgreementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAgreementAccepted: () => void;
}

const TrialAgreementDialog = ({ isOpen, onClose, onAgreementAccepted }: TrialAgreementDialogProps) => {
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
      onAgreementAccepted();
      onClose();
    }
  };

  const paymentInfo = {
    bankName: "中国工商银行",
    accountName: "深圳市科技创新有限公司",
    accountNumber: "4000 0000 0000 0000 0000",
    swiftCode: "ICBKCNBJ",
    amount: "¥9,999",
    purpose: "Kilimax ERP系统试用费用"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Kilimax ERP 试用协议</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Agreement Content */}
          <div className="space-y-4">
            <ScrollArea className="h-[400px] w-full border rounded-lg p-4">
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-lg mb-3">试用服务协议</h3>
                  <p className="text-gray-600 mb-4">
                    欢迎使用Kilimax企业资源规划系统（以下简称"本系统"）。请仔细阅读以下条款和条件。
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">1. 试用期限</h4>
                  <p className="text-gray-600 mb-3">
                    试用期为30天，自收到款项确认之日起计算。试用期间您可以使用本系统的全部功能。
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">2. 费用说明</h4>
                  <p className="text-gray-600 mb-3">
                    试用费用为人民币9,999元，此费用不予退还。如试用期结束后选择正式购买，试用费用可抵扣部分正式授权费用。
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">3. 使用限制</h4>
                  <p className="text-gray-600 mb-3">
                    试用期间仅限于评估和测试用途，不得用于正式的商业运营。系统数据存储限制为1000条记录。
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">4. 数据安全</h4>
                  <p className="text-gray-600 mb-3">
                    我们承诺保护您的数据安全，采用银行级加密技术。试用期结束后，如不购买正式版本，数据将在30天后自动删除。
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">5. 支持服务</h4>
                  <p className="text-gray-600 mb-3">
                    试用期间提供基础技术支持，包括在线文档、邮件支持等。不包括现场实施和定制开发服务。
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">6. 终止条款</h4>
                  <p className="text-gray-600 mb-3">
                    任何一方可在试用期内提前终止试用，但已支付费用不予退还。违反使用条款的，我方有权立即终止试用。
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-xs text-blue-800">
                      <p className="font-medium">隐私声明</p>
                      <p>我们严格遵守相关隐私法规，不会向第三方透露您的商业信息。</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>

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
                我已阅读并同意以上试用协议条款
              </label>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">收款信息</h3>
              {!showPaymentInfo && (
                <Badge variant="outline" className="text-xs">
                  请先同意协议
                </Badge>
              )}
            </div>

            {showPaymentInfo ? (
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-800">
                    线下转账信息
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    请按以下信息完成转账，并保留转账凭证
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <p className="text-xs text-gray-500">开户银行</p>
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
                        <p className="text-xs text-gray-500">收款账户</p>
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
                        <p className="text-xs text-gray-500">账号</p>
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
                        <p className="text-xs text-gray-500">转账金额</p>
                        <p className="font-bold text-lg text-green-600">{paymentInfo.amount}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy('9999', 'amount')}
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
                        <p className="text-xs text-gray-500">转账备注</p>
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
                        <p className="font-medium">重要提醒</p>
                        <p>请确保转账备注信息准确，以便我们快速确认您的付款。</p>
                        <p>转账完成后请联系客服提供转账凭证。</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">请先阅读并同意试用协议</p>
                <p className="text-gray-500 text-sm">同意后将显示收款信息</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!isAgreed}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            确认并开始试用
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrialAgreementDialog;
