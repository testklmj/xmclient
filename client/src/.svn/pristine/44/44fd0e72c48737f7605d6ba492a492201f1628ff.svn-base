/**
 * Created by Administrator on 2016/6/27.
 */
var AgreementCell = ccui.Widget.extend({

    ctor:function(label){
        this._super();
        var text = UICtor.cLabel(label, 22, cc.size(900,0), cc.color("#8E6748"), 0, 0);
        text.anchorX=text.anchorY=0;
        this.addChild(text);
        this.setContentSize(text.width,text.height);
        this.x = 10;
    }

})

var AgreementPop = BasePopup.extend({

    ctor: function () {
        this._super("res/agreement.json");
    },

    selfRender: function () {
        var list = this.getWidget("ListView_6");
        list.pushBackCustomItem(new AgreementCell(">>熊猫麻将服务使用协议（如您未满18岁，请在法定监护人的陪同下阅读本协议）"));
        list.pushBackCustomItem(new AgreementCell("本游戏禁止使用任何破坏游戏公平、公正“游戏外挂”，和一切破坏游戏公平、公正的行为。禁止恶意利用本游戏进行赌博等违法犯罪行为。一经发现，将予以严重打击，永久封号，并追究当事人法律责任。"));
        list.pushBackCustomItem(new AgreementCell("抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。"));
        list.pushBackCustomItem(new AgreementCell("一、网络游戏服务协议"));
        list.pushBackCustomItem(new AgreementCell("根据《网络游戏服务格式化协议必备条款》，游戏中心制定《网络游戏服务协议》。甲方为网络游戏运营企业，乙方为网络游戏用户。"));
        list.pushBackCustomItem(new AgreementCell("1. 账号注册"));
        list.pushBackCustomItem(new AgreementCell("1.1 乙方承诺以其真实身份注册成为甲方的用户，并保证所提供的个人身份资料信息真实、完整、有效，依据法律规定和必备条款约定对所提供的信息承担相应的法律责任。"));
        list.pushBackCustomItem(new AgreementCell("1.2 乙方以其真实身份注册成为甲方用户后，需要修改所提供的个人身份资料信息的，甲方应当及时、有效地为其提供该项服务。"));
        list.pushBackCustomItem(new AgreementCell("2.用户账号使用与保管"));
        list.pushBackCustomItem(new AgreementCell("2.1 根据必备条款的约定，甲方有权审查乙方注册所提供的身份信息是否真实、有效，并应积极地采取技术与管理等合理措施保障用户账号的安全、有效；乙方有义务妥善保管其账号及密码，并正确、安全地使用其账号及密码。任何一方未尽上述义务导致账号密码遗失、账号被盗等情形而给乙方和他人的民事权利造成损害的，应当承担由此产生的法律责任。"));
        list.pushBackCustomItem(new AgreementCell("2.2乙方对登录后所持账号产生的行为依法享有权利和承担责任。"));
        list.pushBackCustomItem(new AgreementCell("2.3 乙方发现其账号或密码被他人非法使用或有使用异常的情况的，应及时根据甲方公布的处理方式通知甲方，并有权通知甲方采取措施暂停该账号的登录和使用。"));
        list.pushBackCustomItem(new AgreementCell("2.4 甲方根据乙方的通知采取措施暂停乙方账号的登录和使用的，甲方应当要求乙方提供并核实与其注册身份信息相一致的个人有效身份信息。"));
        list.pushBackCustomItem(new AgreementCell("2.4.1 甲方核实乙方所提供的个人有效身份信息与所注册的身份信息相一致的，应当及时采取措施暂停乙方账号的登录和使用。"));
        list.pushBackCustomItem(new AgreementCell("2.4.2 甲方违反2.4.1款项的约定，未及时采取措施暂停乙方账号的登录和使用，因此而给乙方造成损失的，应当承担其相应的法律责任。"));
        list.pushBackCustomItem(new AgreementCell("2.4.3 乙方没有提供其个人有效身份证件或者乙方提供的个人有效身份证件与所注册的身份信息不一致的，甲方有权拒绝乙方上述请求。"));
        list.pushBackCustomItem(new AgreementCell("2.5 乙方为了维护其合法权益，向甲方提供与所注册的身份信息相一致的个人有效身份信息时，甲方应当为乙方提供账号注册人证明、原始注册信息等必要的协助和支持，并根据需要向有关行政机关和司法机关提供相关证据信息资料。"));
        list.pushBackCustomItem(new AgreementCell("3. 服务的中止与终止"));
        list.pushBackCustomItem(new AgreementCell("3.1乙方有发布违法信息、严重违背社会公德、以及其他违反法律禁止性规定的行为，甲方应当立即终止对乙方提供服务。"));
        list.pushBackCustomItem(new AgreementCell("3.2乙方在接受甲方服务时实施不正当行为的，甲方有权终止对乙方提供服务。该不正当行为的具体情形应当在本协议中有明确约定或属于甲方事先明确告知的应被终止服务的禁止性行为，否则，甲方不得终止对乙方提供服务。"));
        list.pushBackCustomItem(new AgreementCell("3.3乙方提供虚假注册身份信息，或实施违反本协议的行为，甲方有权中止对乙方提供全部或部分服务；甲方采取中止措施应当通知乙方并告知中止期间，中止期间应该是合理的，中止期间届满甲方应当及时恢复对乙方的服务。"));
        list.pushBackCustomItem(new AgreementCell("3.4 甲方根据本条约定中止或终止对乙方提供部分或全部服务的，甲方应负举证责任。 "));
        list.pushBackCustomItem(new AgreementCell("4.用户信息保护"));
        list.pushBackCustomItem(new AgreementCell("4.1 甲方要求乙方提供与其个人身份有关的信息资料时，应当事先以明确而易见的方式向乙方公开其隐私权保护政策和个人信息利用政策，并采取必要措施保护乙方的个人信息资料的安全。"));
        list.pushBackCustomItem(new AgreementCell("4.2未经乙方许可甲方不得向任何第三方提供、公开或共享乙方注册资料中的姓名、个人有效身份证件号码、联系方式、家庭住址等个人身份信息，但下列情况除外："));
        list.pushBackCustomItem(new AgreementCell("4.2.1 乙方或乙方监护人授权甲方披露的；"));
        list.pushBackCustomItem(new AgreementCell("4.2.2 有关法律要求甲方披露的；"));
        list.pushBackCustomItem(new AgreementCell("4.2.3 司法机关或行政机关基于法定程序要求甲方提供的；"));
        list.pushBackCustomItem(new AgreementCell("4.2.4 甲方为了维护自己合法权益而向乙方提起诉讼或者仲裁时；"));
        list.pushBackCustomItem(new AgreementCell("4.2.5 应乙方监护人的合法要求而提供乙方个人身份信息时。"));
        list.pushBackCustomItem(new AgreementCell("二、新用户注册条例"));
        list.pushBackCustomItem(new AgreementCell("1. 特别提示"));
        list.pushBackCustomItem(new AgreementCell("熊猫麻将同意按照本协议的规定及其不时发布的操作规则提供基于互联网的相关服务 (以下称 “游戏服务 ”)，为获得游戏服务，服务使用人 (以下称 “用户 ”)应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击 “同意 ”按钮即表示用户完全接受本协议项下的全部条款。这些条款可由熊猫麻将随时更新，《熊猫麻将》服务协议一旦发生变动，熊猫麻将将会在相关的页面上提示修改内容。修改后的服务协议一旦在页面上公布即有效代替原来的服务协议。用户在使用《熊猫麻将》提供的各项服务之前，应仔细阅读本服务协议，如用户不同意本服务协议及 /或随时对其的修改，用户可以主动取消熊猫麻将提供的服务。"));
        list.pushBackCustomItem(new AgreementCell("2. 释义"));
        list.pushBackCustomItem(new AgreementCell("本服务条款系由用户与熊猫麻将（以下称“熊猫麻将”）及其联运合作单位之间就熊猫麻将所属的线上游戏《熊猫麻将》所订立的相关权利义务规范。因此，请于注册成为《熊猫麻将》用户前，确实详细阅读本服务条款的所有内容，当您点选同意键或执行《熊猫麻将》线上游戏即视为同意接受本服务条款的所有规范并愿受其拘束。"));
        list.pushBackCustomItem(new AgreementCell("本服务条款所指线上游戏是指用户需要通过计算机等电子设备与服务器联机才可以执行的，由熊猫麻将所全权代理的多人互动游戏软件《熊猫麻将》，《熊猫麻将》包括但不限于：一个单独的计算机程序，其名称或标题为：《熊猫麻将》以及相关的书面文档、图片文件、影片、用户手册（载明软件程序的安装与应用方法）以及与《熊猫麻将》相关的说明书、商标、标识以及任何其他的美术品；以上统称为《熊猫麻将》。用户指愿意通过熊猫麻将提供的游戏途径获得许可（账号和密码）执行线上游戏的个人。"));
        list.pushBackCustomItem(new AgreementCell("3. 著作权声明"));
        list.pushBackCustomItem(new AgreementCell("《熊猫麻将》的所有相关著作权、专利权、商标、营业秘密及其它任何所有权或权利，均属熊猫麻将或其原始授权人所有。非经熊猫麻将或原始授权人的同意，任何人或用户均不得擅自下载、重制、传输、改作、编辑于任何为线上游戏目的以外的使用或任何以获利为目的的使用，否则应负所有法律责任。《熊猫麻将》网络游戏运营过程中产生并储存于熊猫麻将数据库的任何数据信息（包括但不限于帐号数据信息、角色数据信息、等级物品数据信息等，但用户的姓名、身份证号、电话号码等个人身份数据信息除外）的所有权均属于熊猫麻将，用户在按照本服务条款正常使用《熊猫麻将》网络游戏的过程中对属于其用户帐号的数据信息享有有限使用权。"));
        list.pushBackCustomItem(new AgreementCell("4. 隐私权保护"));
        list.pushBackCustomItem(new AgreementCell("4.1用户同意个人隐私信息是指用户通过实名制注册资料中的姓名、个人有效身份证件号码、联系方式、家庭住址、IP地址、邮箱等个人身份信息，及用户在使用游戏服务时存储在熊猫麻将的非公开内容。而非个人隐私信息是指用户对熊猫麻将的操作状态以及使用习惯等一些明确且客观反映在熊猫麻将服务器端的基本记录信息和其他一切个人隐私信息范围外的普通信息。尊重用户个人身份信息的私有性是熊猫麻将的一贯制度，熊猫麻将将会采取合理的措施保护用户的个人隐私信息，除法律或有法律赋予权限的政府部门要求或用户同意等包含在《棋牌游戏服务协议》情况内的原因外，熊猫麻将未经用户同意不向除熊猫麻将联运合作单位以外的任何第三方提供、公开或共享用户通过实名制注册资料中的姓名、个人有效身份证件号码、联系方式、家庭住址等个人隐私信息，及用户在使用游戏服务时存储在熊猫麻将的非公开内容。"));
        list.pushBackCustomItem(new AgreementCell("5. 服务故障的释义"));
        list.pushBackCustomItem(new AgreementCell("5.1发生下列情形之一时，熊猫麻将有权停止或中断线上游戏："));
        list.pushBackCustomItem(new AgreementCell("5.1.1对于熊猫麻将的网络设备进行必要的保养及施工"));
        list.pushBackCustomItem(new AgreementCell("5.1.2发生突发性的网络设备故障时"));
        list.pushBackCustomItem(new AgreementCell("5.1.3由于熊猫麻将所用的网络通信设备由于不明原因停止，无法提供服务时"));
        list.pushBackCustomItem(new AgreementCell("5.1.4由于不可抗力因素致使熊猫麻将无法提供线上游戏服务"));
        list.pushBackCustomItem(new AgreementCell("5.2除此之外，熊猫麻将有权停止或更改各项服务内容或终止任一用户帐户，并在《熊猫麻将》官方网站（熊猫麻将）首页提前 24小时通知，用户违反用户守则的处理不在此例。无论任何情形，熊猫麻将就停止或更改或终止用户帐号所可能产生的不便或损害， 您承认和同意熊猫麻将不就此事负任何损害赔偿责任。"));
        list.pushBackCustomItem(new AgreementCell("5.3 用户应了解并同意，熊猫麻将可能因公司本身、其它协力厂商或相关电信业者网络系统软硬件设备的故障、失灵、或人为操作的疏失而全部或一部分中断、暂时无法使用、迟延或因他人侵入熊猫麻将系统篡改或伪造变造资料等，造成线上游戏的停止或中断者，用户不得要求熊猫麻将提供任何的补偿或赔偿。"));
        list.pushBackCustomItem(new AgreementCell("5.4《熊猫麻将》游戏数值为增加游戏乐趣而设置并随游戏的停止运营而消失，用户一经体验将不得以任何形式退还给熊猫麻将。鉴于网络游戏的特殊性质，游戏数值仅在游戏的运营期内有效。"));
        list.pushBackCustomItem(new AgreementCell("6. 风险承担与责任的免除"));
        list.pushBackCustomItem(new AgreementCell("6.1用户认可熊猫麻将线上游戏软件《熊猫麻将》，熊猫麻将将会尽其合理努力以保护用户的计算机系统及计算机资料的完整性和隐私性，但是，用户承认和同意熊猫麻将不能就此事提供任何保证。"));
        list.pushBackCustomItem(new AgreementCell("6.2使用《熊猫麻将》软件由用户自己承担风险，熊猫麻将不作任何类型的担保，包括但不限于《熊猫麻将》软件的适用性、无病毒、无疏忽或无技术瑕疵问题的明示或默示担保和条件，对在任何情况下因使用或不能使用《熊猫麻将》软件所产生的直接、间接、偶然、特殊及后续的损害及风险，熊猫麻将不承担任何责任。"));
        list.pushBackCustomItem(new AgreementCell("6.3 使用《熊猫麻将》软件涉及到互联网服务，可能会受到各个环节不稳定因素的影响，存在因不可抗力、计算机病毒、黑客攻击、系统不稳定、用户所在位置、用户关机，非法内容信息、骚扰信息屏蔽以及其他任何网络、技术、通信线路、信息安全管理措施等原因造成的服务中断、受阻等不能满足用户要求的风险，用户须明白并自行承担以上风险，熊猫麻将不承担任何责任。"));
        list.pushBackCustomItem(new AgreementCell("6.4 用户因第三方如电信部门的通讯线路故障、技术问题、网络、电脑故障、系统不稳定性及其他各种不可抗力原因而遭受的一切损失，熊猫麻将不承担责任。"));
        list.pushBackCustomItem(new AgreementCell("7. 链接"));
        list.pushBackCustomItem(new AgreementCell("熊猫麻将在其《熊猫麻将》官方网站的所有网页上所提供的所有链接，可能链接到其它个人、公司或组织的网站，提供该等网站的目的，是便利用户自行搜寻或取得信息，熊猫麻将对于被链接的个人、公司或组织的网站所提供的产品、服务或信息，不担保其真实性、完整性、实时性或可信度、这些个人、公司或组织与熊猫麻将间亦不存在任何雇用、委任、代理、合伙或其它类似的关系。"));
        list.pushBackCustomItem(new AgreementCell("8. 损害赔偿"));
        list.pushBackCustomItem(new AgreementCell("用户若违反服务条款或相关法令，导致熊猫麻将、或其关系企业、受雇人、受托人、代理人或及其它相关履行辅助人因此而受到损害或支出费用（包括但不限于因进行民刑事或行政程序所支出的律师费用），用户应负担损害赔偿责任。"));
        list.pushBackCustomItem(new AgreementCell("9. 停止或变更服务"));
        list.pushBackCustomItem(new AgreementCell("9.1熊猫麻将取消或停止用户的资格或加以限制，用户不得要求补偿或赔偿。"));
        list.pushBackCustomItem(new AgreementCell("9.2熊猫麻将保留将来新增、修改或删除线上游戏的全部或部分的权利，且不另行个别通知，用户不得因此要求任何补偿或赔偿。"));
        list.pushBackCustomItem(new AgreementCell("10. 广告信息或促销计划"));
        list.pushBackCustomItem(new AgreementCell("熊猫麻将的线上游戏软件上可能刊登商业广告、或其它活动促销的广告。这些内容系广告商或商品服务提供者所为，熊猫麻将仅提供刊登内容的媒介。用户通过熊猫麻将或其所链接的网站所购买的服务或商品，其交易行为仅存于用户与该商品或服务的提供者之间，与熊猫麻将无关。"));
        list.pushBackCustomItem(new AgreementCell("11. 服务条款的修改"));
        list.pushBackCustomItem(new AgreementCell("由于用户及市场状况的不断变化，熊猫麻将保留随时修改本服务条款的权利，修改本服务条款时，熊猫麻将将于《熊猫麻将》官方网站首页公告修改的事实，而不另对用户进行个别通知。若用户不同意修改的内容，可停止使用熊猫麻将的线上游戏。若用户继续使用熊猫麻将的线上游戏，即视为用户业已接受熊猫麻将所修订的内容。"));
        list.pushBackCustomItem(new AgreementCell("12. 个别条款的效力"));
        list.pushBackCustomItem(new AgreementCell("本服务条款所定的任何条款的一部或全部无效者，不影响其它条款的效力。"));
        list.pushBackCustomItem(new AgreementCell("13. 法律适用及纠纷解决"));
        list.pushBackCustomItem(new AgreementCell("本服务条款的解释，效力及纠纷的解决，适用于中华人民共和国法律。如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；如协商不成，任何与本服务协议有关的争议均由熊猫麻将所在地的人民法院管辖。"));
        list.pushBackCustomItem(new AgreementCell("14. 版权声明"));
        list.pushBackCustomItem(new AgreementCell("本产品及使用说明书均受版权法保护，所有程序及图文内容非经著作权人书面许可，不得以任何方式做全部或局部复制、转载或修改。用户应按使用许可协议的规定使用本产品，违者将依法追究其责任。本产品及包装、手册上的所有相关产品名称、商标、品牌、画面均归原著作权人或熊猫麻将拥有，是属于其各自所有者的财产。"));
        list.pushBackCustomItem(new AgreementCell("三、用户守则"));
        list.pushBackCustomItem(new AgreementCell("《熊猫麻将》拥有完善的游戏机制和强壮的运行能力,为了各位用户能够更好的享受《熊猫麻将》中的每个精彩时刻，您应该遵守以下守则："));
        list.pushBackCustomItem(new AgreementCell("第一、您单独承担发布内容的责任。您对服务的使用是根据所有适用于社区服务的我国法律、行政法规，您必须遵循如下规定："));
        list.pushBackCustomItem(new AgreementCell("(1) 发布信息时必须符合我国法律、行政法规及国际条约和惯例。"));
        list.pushBackCustomItem(new AgreementCell("(2) 不干扰或混乱网络服务。"));
        list.pushBackCustomItem(new AgreementCell("(3) 遵守所有服务的网络协议、规定和程序。"));
        list.pushBackCustomItem(new AgreementCell("(4) 遵守熊猫麻将针对其各种服务制定的相应服务条款。"));
        list.pushBackCustomItem(new AgreementCell("网上游戏及虚拟社区服务是利用因特网发送和收取信息。所以，用户的行为指引依据是国家有关因特网的法规，政策和程序等。您须承诺不发布反对宪法所确定的基本原则的信息。若您在游戏中的行为违反上述条款或者国家其他法律的信息，则您需要对自己在熊猫麻将的行为承担法律责任，系统的自动记录可能作为您违反法律的证据。"));
        list.pushBackCustomItem(new AgreementCell("第二、尊重其他用户的权利，不进行任何可能会侵害其他用户游戏质量的活动。"));
        list.pushBackCustomItem(new AgreementCell("第三、发现游戏漏洞时主动向游戏管理人员汇报，熊猫麻将对举报者有奖。严禁利用任何 BUG进行非正常性的获利。"));
        list.pushBackCustomItem(new AgreementCell("第四、游戏中的积分、游戏币、金游戏币和银子是游戏中的的游戏数值。目的是增加游戏乐趣 ,体现用户棋牌技巧，不具有现实中财富的价值。所以游戏数值不能兑换为现钞，用户不得私下买卖。"));
        list.pushBackCustomItem(new AgreementCell("第五、为了保证游戏公平性，熊猫麻将将不会介入到任何用户之间纠纷中去。"));
        list.pushBackCustomItem(new AgreementCell("第六、每个用户均有请求游戏管理人员帮助的权利，但是，为了能够让更多的人获得帮助，每个用户应该自觉不与游戏管理人员闲聊。游戏管理人员有权利不回答与工作无关的闲聊话题。"));
        list.pushBackCustomItem(new AgreementCell("第七、每个用户均有监督游戏管理人员的权利，如果您发现游戏管理人员任何违规行为，可以采用截图等方式保存证据，并将投诉内容提交给客服，我们的管理部门将会对该名游戏管理员进行检查。"));
        list.pushBackCustomItem(new AgreementCell("第八、在游戏中禁止假冒熊猫麻将管理人员或其他工作人员。"));
        list.pushBackCustomItem(new AgreementCell("第九、理解并且遵守熊猫麻将颁布的所有规定。"));
        list.pushBackCustomItem(new AgreementCell("游戏管理人员将有权立即暂停任何可能危害游戏系统的游戏账号上线权利，所有游戏管理人员都将严格按照中立和公正原则，不偏袒、不徇私。"));
        list.pushBackCustomItem(new AgreementCell("四、游戏数值服务协议"));
        list.pushBackCustomItem(new AgreementCell("服务介绍"));
        list.pushBackCustomItem(new AgreementCell("游戏数值是在游戏活动中使用的道具，包括游戏道具、用户名、经验、级别、荣誉值、角色服饰等。仅仅是计算机系统中的一个数值，本身并无实际价值，只是作为资深用户享受熊猫麻将在线娱乐服务的一个凭证，用户可以获得所有类型的服务。"));
        list.pushBackCustomItem(new AgreementCell("熊猫麻将慎重声明"));
        list.pushBackCustomItem(new AgreementCell("1)熊猫麻将提供的服务将会按照其发布的章程、服务条款和操作规则严格执行。"));
        list.pushBackCustomItem(new AgreementCell("2)严禁用户在熊猫麻将利用任何方式利用游戏数值进行赌博。"));
        list.pushBackCustomItem(new AgreementCell("3)严禁用户在熊猫麻将贩卖游戏数值，严禁任何有偿转让游戏数值的行为。"));
        list.pushBackCustomItem(new AgreementCell("4)严禁用户在熊猫麻将偷盗游戏数值（特别注释：偷盗游戏数值的行为指的是，在未经游戏数值持有人允许的情况下，将该游戏数值转移、使用、获得等行为或者利用系统漏洞获取他人游戏数值，并将该游戏数值转移、使用、获得等行为，熊猫麻将有权根据纪录清理以上方式获得的游戏数值）。"));
        list.pushBackCustomItem(new AgreementCell("5)严禁用户利用系统漏洞或游戏BUG进行非正常性的获利。"));
        list.pushBackCustomItem(new AgreementCell("6)严禁用户利用虚假游戏或其他任何非正常游戏方式转移游戏数值的行为。"));
        list.pushBackCustomItem(new AgreementCell("7)严禁用户利用同一台电脑注册多个帐号登陆平台，进行恶意挂机或刷取游戏数值的行为。"));
        list.pushBackCustomItem(new AgreementCell("8)用户因客户端的原因、通讯线路原因、电脑故障、系统不稳定性及其他各种原因游戏数值损失，熊猫麻将不承担责任。"));
        list.pushBackCustomItem(new AgreementCell("9)在一般情况之下，熊猫麻将只能帮助用户恢复系统服务器中有记录的符合熊猫麻将规则下进行的游戏数值。而对没有记载的数据不能给予支持。"));
        list.pushBackCustomItem(new AgreementCell("10)熊猫麻将发现用户帐号数据异常，有权采取相应措施，包括对该异常帐号的冻结、终止、该异常帐号内相关数值的清除。"));
        list.pushBackCustomItem(new AgreementCell("11)用户因违反熊猫麻将规章制度导致账号被封闭造成的游戏数值损失，熊猫麻将不承担责任。"));
        list.pushBackCustomItem(new AgreementCell("五、游戏行为监督处罚制度"));
        list.pushBackCustomItem(new AgreementCell("根据用户服务条例以及国家相关法律规定，本熊猫麻将的所有用户本应该在房间内进行正常公平的竞技和娱乐活动，注册、聊天和游戏时不能使用侮辱性语言，不得恶意干扰游戏秩序，但是目前尚有少数用户使用侮辱性语言对其他游戏用户进行辱骂，采用短时间发送大量消息的刷屏行为或使用恶意耗时、串通作弊、盗用账号、利用作弊软件和游戏漏洞作弊等手段进行不公平的竞争，严重破坏了网上娱乐的良好环境，影响了其他用户的游戏心情，侵犯了其他用户的正常游戏权益。为了更好地维护广大熊猫麻将游戏用户的利益，特此制定了“游戏行为监督处罚制度”，对于今后游戏中查出的所有骂人、刷屏、作弊行为，熊猫麻将都将按照本制度进行处罚，希望能为大家提供一个公平和谐的游戏环境。"));
        list.pushBackCustomItem(new AgreementCell("一、表现形式"));
        list.pushBackCustomItem(new AgreementCell("1、骂人的形式"));
        list.pushBackCustomItem(new AgreementCell("包括游戏大厅、游戏房间内消息使用侮辱性语言及论坛发贴使用侮辱性语言或注册带有侮辱性信息的帐号，不论出发点、事因，都将视为骂人而依照本规定进行处罚。"));
        list.pushBackCustomItem(new AgreementCell("2、刷屏的形式 "));
        list.pushBackCustomItem(new AgreementCell("包括游戏大厅、游戏房间内消息在短时间内超常规发送大量无意义消息及论坛短时间内重复发贴，不论出发点，事因，都将视为恶意刷屏而依照本规定进行处罚。"));
        list.pushBackCustomItem(new AgreementCell("3、作弊的形式"));
        list.pushBackCustomItem(new AgreementCell("串通游戏、主动炒分、被动炒分、盗用账号、恶意耗时、利用作弊软件或程序漏洞获得不正当利益、以及为了自己获得利益而损害他人利益的行为都被熊猫麻将定义为作弊行为。其中，串通游戏指两个或两个以上用户在同一游戏室内互通消息，相互配合来谋取其他用户利益的行为；主动炒分指得是利用一个或多个用户名为某个游戏帐号送分，从而使这个游戏帐号轻松获得游戏数值的行为；被动炒分指的是在其他用户故意送游戏数值给您的情况下，您仍然和该用户进行游戏、接受该用户所送的行为；恶意耗时行为指的是故意拖延游戏时间构成损害其他用户利益的行为。"));
        list.pushBackCustomItem(new AgreementCell("二、举报办法"));
        list.pushBackCustomItem(new AgreementCell("1、骂人、刷屏的举报办法 "));
        list.pushBackCustomItem(new AgreementCell("本熊猫麻将管理处接受抓屏举报：若对现有的用户行为有疑义，可及时通过客服联系方式提交给客服，举报时请提供被举报人用户ID、游戏昵称及举报人用户ID。本熊猫麻将管理处会对投诉进行检查核实，查证属实的投诉一律按处罚办法处理。"));
        list.pushBackCustomItem(new AgreementCell("2、作弊的举报办法"));
        list.pushBackCustomItem(new AgreementCell("若对现有的用户行为有疑义，可在三天内举报至游戏管理员，用户若有证据一律以全屏截图为准，熊猫麻将也会调用用户记录进行查证任何用户。举报时请提供被举报人用户ID、游戏昵称、所有游戏房间与桌位以及举报人用户ID。本熊猫麻将管理处会对投诉进行检查核实，查证属实的投诉一律按处罚办法处理。 遇到骂人、刷屏、作弊情况，用户也可在游戏中立即电话联系客服人员，同时本熊猫麻将系统程序每天自动搜索骂人、刷屏、作弊情况，自动查封。"));
        list.pushBackCustomItem(new AgreementCell("三、处罚办法"));
        list.pushBackCustomItem(new AgreementCell("1、骂人、刷屏用户的处罚办法"));
        list.pushBackCustomItem(new AgreementCell("第一次禁言帐号一天处理；第二次禁言帐号一周处理；第三次禁言帐号一月处理；第四次或四次以上永久禁言帐号处理。"));
        list.pushBackCustomItem(new AgreementCell("系统会根据处罚帐号所设定的时间，到期时自行解除游戏帐号发言限制。"));
        list.pushBackCustomItem(new AgreementCell("注："));
        list.pushBackCustomItem(new AgreementCell("1)禁言帐号处罚意味着在禁言时间，帐号将无法在游戏房间内使用文字进行交流，在发送文字信息时，系统提示“【系统】您已经被管理员禁言！” 因违反管理规定被处罚而导致的游戏数值等游戏各种资料的损失，本中心一律不予以补偿。"));
        list.pushBackCustomItem(new AgreementCell("2)对于任何一种骂人刷屏行为，本中心视情节轻重，有权在第一次查出其骂人刷屏行为时，对其进行以下处理：还原游戏资料、没收其游戏数值、封闭其账号、删除其账号、屏蔽其计算机并保留提交公安机关协助受辱用户追诉权力。"));
        list.pushBackCustomItem(new AgreementCell("2、作弊的处理办法 只要被发现有作弊数据记录或作弊行为，不论帐号使用人及会员等级，均按以下规定进行处罚。对于任何一种作弊行为，熊猫麻将视情节轻重，有权按以下不同情节处理："));
        list.pushBackCustomItem(new AgreementCell("1)对游戏内可疑帐户冻结登陆时间24小时处理，并在游戏大厅内发送消息作为警告。"));
        list.pushBackCustomItem(new AgreementCell("2)在第一次查出其作弊行为时，视情节轻重对其进行以下处理，帐户冻结登陆时间一周处理，没收其游戏数值20%，并在游戏大厅内发送消息作为警告。"));
        list.pushBackCustomItem(new AgreementCell("3)对于情节严重的行为，熊猫麻将有权立即处以游戏数值资料清零处理、取消其会员资格、封闭其游戏帐号、删除其游戏帐号、关闭其自创的游戏室、乃至屏蔽其计算机。"));
        list.pushBackCustomItem(new AgreementCell("上述各条处理办法之间互不相抵，可各自执行。熊猫麻将会定期在主页或论坛或游戏中公布查处作弊名单。"));
        list.pushBackCustomItem(new AgreementCell("本条款未涉及的问题参见国家有关法律法规，当本条款与国家法律法规冲突时，以国家法律法规为准。在本条款规定范围内，熊猫麻将有最终解释权。"));

    }
});