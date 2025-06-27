
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
      alert('感谢您的订阅！请按照收款信息完成转账，我们将在收到款项后激活您的正式账户。');
      window.close();
    }
  };

  const paymentInfo = {
    bankName: "中国工商银行",
    accountName: "深圳市科技创新有限公司",
    accountNumber: "4000 0000 0000 0000 0000",
    swiftCode: "ICBKCNBJ",
    amount: "¥29,999",
    purpose: "Kilimax ERP系统正式订阅费用"
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
            关闭
          </Button>
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Kilimax ERP 正式订阅协议</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agreement Content */}
          <div className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl">订阅服务协议</CardTitle>
                <CardDescription>
                  欢迎订阅Kilimax企业资源规划系统（以下简称"本系统"）。请仔细阅读以下条款和条件。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full border rounded-lg p-4">
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">1. 订阅期限</h4>
                      <p className="text-gray-600 mb-3">
                        正式订阅期为一年，自收到款项确认之日起计算。订阅期间您可以使用本系统的全部功能。
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">2. 费用说明</h4>
                      <p className="text-gray-600 mb-3">
                        正式订阅费用为人民币29,999元/年。费用包含系统使用权、技术支持、定期更新等服务。
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">3. 服务内容</h4>
                      <p className="text-gray-600 mb-3">
                        正式订阅包含完整的ERP功能模块、无限制数据存储、专业技术支持、系统定制服务等。
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">4. 数据安全</h4>
                      <p className="text-gray-600 mb-3">
                        我们承诺保护您的数据安全，采用银行级加密技术。提供定期数据备份和灾难恢复服务。
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">5. 技术支持</h4>
                      <p className="text-gray-600 mb-3">
                        正式订阅用户享受7x24小时技术支持，包括在线客服、电话支持、现场实施、定制开发等服务。
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">6. 续费政策</h4>
                      <p className="text-gray-600 mb-3">
                        订阅到期前30天，我们将通知您续费。续费享受老客户优惠价格。
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">7. 退款政策</h4>
                      <p className="text-gray-600 mb-3">
                        订阅生效后30天内，如对服务不满意，可申请退款。超过30天后，不接受退款申请。
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">8. 服务等级协议</h4>
                      <p className="text-gray-600 mb-3">
                        我们承诺系统可用性达到99.9%，如未达到承诺标准，将按比例赔偿服务费用。
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
                我已阅读并同意以上正式订阅协议条款
              </label>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-6">
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
                        onClick={() => handleCopy('29999', 'amount')}
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
                <p className="text-gray-500">请先阅读并同意订阅协议</p>
                <p className="text-gray-500 text-sm">同意后将显示收款信息</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button variant="outline" onClick={() => window.close()}>
            取消
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!isAgreed}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            确认订阅
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAgreement;
