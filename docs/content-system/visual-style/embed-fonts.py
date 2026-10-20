import re,base64,io,sys
from fontTools import subset
from fontTools.ttLib import TTFont
F=__import__('os').path.join(__import__('os').path.dirname(__file__),'fonts','manrope-latin-%d-normal.woff2')
src,out=sys.argv[1],sys.argv[2]
s=open(src).read()
chars=set(''.join(re.findall(r'>([^<>]+)</text>',s)))|set(' 0123456789')
chars={c for c in chars if not c.isspace() or c==' '}
css=''
for w in (500,600,700,800):
    f=TTFont(F%w); o=subset.Options(); o.flavor='woff2'; o.layout_features=['kern','tnum']
    sub=subset.Subsetter(o); sub.populate(text=''.join(chars)); sub.subset(f)
    b=io.BytesIO(); f.flavor='woff2'; f.save(b)
    css+="@font-face{font-family:Manrope;font-weight:%d;src:url(data:font/woff2;base64,%s) format('woff2')}"%(w,base64.b64encode(b.getvalue()).decode())
s=s.replace('/*FONTS*/',css)
open(out,'w').write(s); print(out,len(s)//1024,'KB')
